// ایمپورت کتابخانه‌ها
import React, { useState, useEffect } from 'react';
import './App.css';

// کامپوننت اصلی اپلیکیشن
function App() {
  // تعریف حالت‌ها (states)
  const [todos, setTodos] = useState([]); 
  const [input, setInput] = useState(''); 

  // تابع برای بارگذاری داده‌ها
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos); 
    }
  }, []); 

  // تابع برای ذخیره داده‌ها
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // تابع برای اضافه کردن کار جدید
  const addTodo = () => {
    if (input.trim() === '') return; // اگر ورودی خالی بود، هیچ کاری نکن
    const newTodo = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]); // اضافه کردن به لیست موجود
    setInput(''); // خالی کردن ورودی
  };

  // تابع برای حذف کار
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // تابع برای تغییر وضعیت تکمیل‌شده
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo 
    ));
  };

  // تابع برای ویرایش کار
  const editTodo = (id, oldText) => {
    const newText = prompt('ویرایش کار:', oldText);
    if (newText && newText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo // بروزرسانی متن
      ));
    }
  };

  return (
    <div className="app">
      <h1>لیست کارهای روزانه</h1>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} // بروزرسانی ورودی با هر تایپ
        placeholder="کار جدید اضافه کنید..." 
      />
      <button onClick={addTodo}>اضافه کردن</button>
      
      <ul>
        {todos.map(todo => ( // نمایش لیست کارهای todo
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.text}
            <button onClick={() => toggleComplete(todo.id)}>تکمیل</button>
            <button onClick={() => editTodo(todo.id, todo.text)}>ویرایش</button>
            <button onClick={() => deleteTodo(todo.id)}>حذف</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App; 