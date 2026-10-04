"""Fold constant weight transposes before q8 export (including decoder branches)."""
import argparse,hashlib
from pathlib import Path
import numpy as np
import onnx
from onnx import numpy_helper
from onnxruntime.quantization import quantize_dynamic,QuantType
def quantize(source,target):
    model=onnx.load(source);constants={v.name:v for v in model.graph.initializer};folded={}
    def walk(graph):
        replacements={};keep=[]
        for node in graph.node:
            if node.op_type=='Transpose' and node.input[0] in constants:
                tensor=constants[node.input[0]];axes=next((list(a.ints) for a in node.attribute if a.name=='perm'),list(reversed(range(len(tensor.dims)))))
                key=(node.input[0],tuple(axes));name='folded_'+hashlib.sha256(str(key).encode()).hexdigest()[:16]
                if key not in folded:
                    folded[key]=numpy_helper.from_array(np.transpose(numpy_helper.to_array(tensor),axes).copy(),name)
                replacements[node.output[0]]=name
            else:keep.append(node)
        del graph.node[:];graph.node.extend(keep)
        for node in graph.node:
            for i,value in enumerate(node.input):
                if value in replacements:node.input[i]=replacements[value]
            for attr in node.attribute:
                if attr.type==onnx.AttributeProto.GRAPH:walk(attr.g)
    walk(model.graph);model.graph.initializer.extend(folded.values());temporary=Path(str(target)+'.folded.onnx');onnx.save(model,temporary)
    quantize_dynamic(str(temporary),str(target),weight_type=QuantType.QUInt8,per_channel=False,op_types_to_quantize=['MatMul','Gather'],extra_options={'EnableSubgraph':True});temporary.unlink()
def main():
    p=argparse.ArgumentParser();p.add_argument('--models',required=True);a=p.parse_args()
    for directory in Path(a.models).iterdir():
        if not (directory/'export/decoder_model_merged.onnx').exists():continue
        for name in ['encoder_model','decoder_model_merged']:quantize(directory/'export'/(name+'.onnx'),directory/'pack/onnx'/(name+'_quantized.onnx'))
        print(directory.name,sum(p.stat().st_size for p in (directory/'pack').rglob('*') if p.is_file()),flush=True)
if __name__=='__main__':main()
