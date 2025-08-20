import React from 'react'
import TaskCard from './TaskCard'

export default function TaskList({tasks, onView, onEdit, onDelete}) {
  return (
    <div className='space-y-4'>
        {tasks.map((task) => (
        <TaskCard 
            key={task.id}
            task={task}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
        />
        ))}
    </div>
  )
}
