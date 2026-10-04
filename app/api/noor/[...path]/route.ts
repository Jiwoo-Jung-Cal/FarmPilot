import {handle} from '@/lib/server';
export async function GET(request:Request,context:{params:Promise<{path:string[]}>}){return handle(request,(await context.params).path.join('/'));}
export async function POST(request:Request,context:{params:Promise<{path:string[]}>}){return handle(request,(await context.params).path.join('/'));}
