import { connectDB } from "@/app/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const tasks = userId ? await Task.find({ userId }) : await Task.find();
    return Response.json(tasks);
}

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const newTask = await Task.create(body);
    return Response.json(newTask);
}