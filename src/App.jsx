import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import TodayPage from './pages/TodayPage';
import ProcessesPage from './pages/ProcessesPage';
import ProcessDetailPage from './pages/ProcessDetailPage';
import LearnPage from './pages/LearnPage';
import LessonPage from './pages/LessonPage';
import FlowsPage from './pages/FlowsPage';
import HelpPage from './pages/HelpPage';

export default function App(){
  const [view,setView]=useState(()=>localStorage.getItem('pdc-view')||'operacao');
  useEffect(()=>localStorage.setItem('pdc-view',view),[view]);
  return <Routes>
    <Route element={<AppShell view={view} setView={setView}/> }>
      <Route index element={<TodayPage view={view}/>}/>
      <Route path="fazer" element={<ProcessesPage/>}/>
      <Route path="fazer/:id" element={<ProcessDetailPage/>}/>
      <Route path="aprender" element={<LearnPage/>}/>
      <Route path="aprender/:id" element={<LessonPage/>}/>
      <Route path="fluxos" element={<FlowsPage/>}/>
      <Route path="ajuda" element={<HelpPage/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Route>
  </Routes>;
}
