export async function GET(){
    return Response.json({ success: true, data: 'Thank you!'}, {status:200})
}