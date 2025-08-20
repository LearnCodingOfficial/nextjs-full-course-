import { connectDB } from "@/app/lib/mongodb";
import Task from "@/models/Task";

export async function PUT(req, { params}) {
    await connectDB();
    const body = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true });
    return Response.json(updatedTask);
}

export async function DELETE(req, { params }) {
    await connectDB();
    console.log("Deleting task with ID:", params.id);
    const deletedTask = await Task.findByIdAndDelete(params.id);
    return Response.json({ message: "Task deleted successfully", task: deletedTask });
}