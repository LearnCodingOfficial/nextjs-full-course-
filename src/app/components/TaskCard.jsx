import React from 'react'

export default function TaskCard({task, onView, onEdit, onDelete}) {
  return (
    <div className='bg-white p-5 rounded-lg shadow flex justify-between items-center hover:shadow-lg transition'>
        <div>
            <p className='text-lg font-semibold text-gray-800'>{task.title}</p>
            <p className={`text-sm font-medium ${task.status == "Pending" 
                        ? "text-red-500" 
                        : task.status == "In Progress" 
                        ? "text-yellow-500" 
                        : "text-green-500"}`}>
                            {task.status}
                        </p>
        </div>
        <div className="flex space-x-4">
                <button className='text-gray-500 hover:text-gray-800' onClick={() => onView(task)}> View </button>
                <button className='text-indigo-600 hover:text-gray-800' onClick={() => onEdit(task)}> Edit </button>
                <button className='text-red-500 hover:text-red-800' onClick={() => onDelete(task._id)}> Delete </button>
        </div>
    </div>
  )
}
