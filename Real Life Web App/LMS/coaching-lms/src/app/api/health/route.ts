import { connectDb } from "@/lib/db/connect";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        await connectDb()
        return NextResponse.json(
            {ok:true,message:"API is health. DB connected."},{status:200}
        );
    } catch (err) {
        return NextResponse.json({
            ok:false,
            message:"Health check failed",
            error:err instanceof Error ? err.message:"Unknown error"
        },{
            status:500
        })
    }
}