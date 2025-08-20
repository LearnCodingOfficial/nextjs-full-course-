import { connectDB } from "@/app/lib/mongodb";
import Task from "@/models/Task";

export async function GET(req) {
    await connectDB();
    const tasks = await Task.find();
    return Response.json(tasks);
}

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const newTask = await Task.create(body);
    return Response.json(newTask);
}