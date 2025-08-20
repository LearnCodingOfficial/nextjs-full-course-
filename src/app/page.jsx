'use client';
import React, { useEffect, useState } from 'react'
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import TaskForm from './components/TaskForm';
import TaskView from './components/TaskView';
import { useAuth } from './lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const { user, logout} = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', status: '', description: '' });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tasks")
       .then((res) => res.json())
       .then((data) => setTasks(data));
  }, []);
  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, router]);
  const handleDelete = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });
    setTasks(tasks.filter(task => task._id !== id));
  }
  const handleAddTask = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, userId: user.uid })
    })
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setFormData({ title: '', status: 'Pending', description: '' });
    setIsAdding(false);
  }
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    
    const res = await fetch(`/api/tasks/${isEditing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const updatedTask = await res.json();

    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    setIsEditing(null);
    setFormData({ title: '', status: '', description: '' });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className="max-w-2xl mx-auto">
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-extrabold text-gray-900'> My Tasks</h1>
            <button className='px-4 py-2 bg-blue-600 text-white rounded-md' onClick={() => setIsAdding(true)}>+ Add Task</button>
            {user &&(
              <div className='flex items-center gap-4'>
                <img
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt='User'
                  className='w-8 h-8 rounded-full border'
                />
                <button className='px-4 py-2 bg-red-600 text-white rounded-md' onClick={logout}>Logout</button>
              </div>
            )
            }
          </div>

          <TaskList tasks={tasks} onView={setSelectedTask} onEdit={(task) => { setIsEditing(task); setFormData(task); }} onDelete={handleDelete}/>

          {
            selectedTask && (
              <TaskModal onClose={() => setSelectedTask(null)}>
                <TaskView task={selectedTask} />
              </TaskModal>
            )
          }
          {
            isAdding && (
              <TaskModal onClose={() => setIsAdding(false)}>
                <h2 className='text-xl font-bold mb-4'>Add New Task</h2>
                <TaskForm onSubmit={handleAddTask} setFormData={setFormData} formData={formData} buttonLabel="Add Task" onCancel={() => setIsAdding(false)} />
              </TaskModal>
            )
          }
          {
            isEditing && (
              <TaskModal onClose={() => setIsEditing(null)}>
                <h2 className='text-xl font-bold mb-4'>Edit Task</h2>
                <TaskForm onSubmit={handleUpdateTask} setFormData={setFormData} formData={formData} buttonLabel="Update Task" onCancel={() => setIsEditing(null)} />
              </TaskModal>
            )
          }
      </div>

    </div>
  )
}
