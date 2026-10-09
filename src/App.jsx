import React, { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookMarked,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  LayoutDashboard,
  Library,
  Menu,
  Plus,
  Search,
  Settings2,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';

const initialLoans = [
  { id: 1, student: 'Marina Costa', initials: 'MC', book: 'O Pequeno Príncipe', class: '8º A', date: '12 jun', due: '19 jun', status: 'No prazo', tone: 'green' },
  { id: 2, student: 'Pedro Henrique', initials: 'PH', book: 'A Bolsa Amarela', class: '6º B', date: '11 jun', due: '18 jun', status: 'No prazo', tone: 'green' },
  { id: 3, student: 'Luiza Martins', initials: 'LM', book: 'Extraordinário', class: '9º A', date: '07 jun', due: '14 jun', status: 'Atrasado', tone: 'coral' },
  { id: 4, student: 'Rafael Souza', initials: 'RS', book: 'Capitães da Areia', class: '2º EM', date: '06 jun', due: '13 jun', status: 'Atrasado', tone: 'coral' },
  { id: 5, student: 'Bia Oliveira', initials: 'BO', book: 'O Sítio do Picapau Amarelo', class: '5º A', date: '12 jun', due: '19 jun', status: 'No prazo', tone: 'green' },
];

const books = [
  { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', category: 'Literatura', copies: 8, available: 5 },
  { title: 'A Bolsa Amarela', author: 'Lygia Bojunga', category: 'Literatura', copies: 6, available: 2 },
  { title: 'Extraordinário', author: 'R. J. Palacio', category: 'Juvenil', copies: 5, available: 1 },
  { title: 'Capitães da Areia', author: 'Jorge Amado', category: 'Literatura', copies: 4, available: 0 },
  { title: 'O Sítio do Picapau Amarelo', author: 'Monteiro Lobato', category: 'Infantil', copies: 7, available: 4 },
  { title: 'Quarto de Despejo', author: 'Carolina Maria de Jesus', category: 'Biografia', copies: 3, available: 2 },
];

const initialStudents = [
  { name: 'Marina Costa', initials: 'MC', class: '8º A', active: 2, status: 'Ativo' },
  { name: 'Pedro Henrique', initials: 'PH', class: '6º B', active: 1, status: 'Ativo' },
  { name: 'Luiza Martins', initials: 'LM', class: '9º A', active: 1, status: 'Ativo' },
  { name: 'Rafael Souza', initials: 'RS', class: '2º EM', active: 2, status: 'Ativo' },
  { name: 'Bia Oliveira', initials: 'BO', class: '5º A', active: 1, status: 'Ativo' },
];

const navigation = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Acervo', icon: BookOpen },
  { label: 'Empréstimos', icon: BookMarked },
  { label: 'Alunos', icon: UsersRound },
];

const pageTitles = {
  'Visão geral': ['Bom dia, Ana', 'Aqui está o movimento da biblioteca hoje.'],
  Acervo: ['Acervo', 'Todos os títulos da sua biblioteca, em um só lugar.'],
  Empréstimos: ['Empréstimos', 'Acompanhe retiradas, devoluções e prazos.'],
  Alunos: ['Alunos', 'Encontre estudantes e acompanhe suas leituras.'],
  Relatórios: ['Relatórios', 'Um retrato do que acontece entre as estantes.'],
};

function App() {
  const [page, setPage] = useState('Visão geral');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(null);
  const [loans, setLoans] = useState(initialLoans);
  const [catalog, setCatalog] = useState(books);
  const [students, setStudents] = useState(initialStudents);
  const [notice, setNotice] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const matchingLoans = useMemo(() => loans.filter((loan) => `${loan.student} ${loan.book} ${loan.class}`.toLowerCase().includes(query.toLowerCase())), [loans, query]);
  const matchingBooks = useMemo(() => catalog.filter((book) => `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase())), [catalog, query]);
  const matchingStudents = useMemo(() => students.filter((student) => `${student.name} ${student.class}`.toLowerCase().includes(query.toLowerCase())), [students, query]);

  function submitModal(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (modal === 'Novo empréstimo') {
      const studentName = values.get('student');
      const bookName = values.get('book');
      const student = students.find((item) => item.name === studentName);
      setLoans((current) => [{ id: Date.now(), student: studentName, initials: student?.initials ?? 'AL', book: bookName, class: student?.class ?? '—', date: 'Hoje', due: 'Em 7 dias', status: 'No prazo', tone: 'green' }, ...current]);
    } else if (modal === 'Adicionar título') {
      const title = values.get('name');
      const copies = Number(values.get('copies'));
      setCatalog((current) => [{ title, author: values.get('detail'), category: 'Literatura', copies, available: copies }, ...current]);
    } else if (modal === 'Cadastrar aluno') {
      const name = values.get('name');
      const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
      setStudents((current) => [{ name, initials, class: values.get('detail'), active: 0, status: 'Ativo' }, ...current]);
    }
    setNotice(`${modal} realizado com sucesso.`);
    setModal(null);
    window.setTimeout(() => setNotice(''), 3200);
  }

  function changePage(label) {
    setPage(label);
    setQuery('');
    setMobileNavOpen(false);
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#inicio" onClick={(event) => { event.preventDefault(); changePage('Visão geral'); }}>
          <span className="brand-mark"><Library size={21} strokeWidth={2.1} /></span>
          <span className="brand-copy"><strong>aurora</strong><small>biblioteca escolar</small></span>
        </a>

        <div className="school-switcher">
          <span className="school-avatar">IP</span>
          <span className="school-copy"><strong>Instituto Primavera</strong><small>Unidade Centro</small></span>
          <ChevronDown size={15} />
        </div>

        <div className="nav-label">MENU PRINCIPAL</div>
        <nav className="primary-nav" aria-label="Menu principal">
          {navigation.map(({ label, icon: Icon }) => (
            <button className={`nav-item ${page === label ? 'active' : ''}`} key={label} onClick={() => changePage(label)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === 'Empréstimos' && <span className="nav-count">12</span>}
            </button>
          ))}
        </nav>

        <div className="nav-label secondary-label">GESTÃO</div>
        <nav className="primary-nav" aria-label="Gestão">
          <button className={`nav-item ${page === 'Relatórios' ? 'active' : ''}`} onClick={() => changePage('Relatórios')}>
            <Settings2 size={18} strokeWidth={1.8} /><span>Relatórios</span>
          </button>
          <button className="nav-item" onClick={() => { setNotice('Central de ajuda em breve.'); window.setTimeout(() => setNotice(''), 3200); }}>
            <CircleHelp size={18} strokeWidth={1.8} /><span>Ajuda</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="reading-note">
            <span className="note-sparkle"><Sparkles size={15} /></span>
            <p>Uma página por dia<br /><strong>muda uma história.</strong></p>
            <span className="note-decoration">✳</span>
          </div>
          <button className="profile-button" onClick={() => setNotice('Perfil de Ana Clara')}>
            <span className="profile-avatar">AC</span>
            <span className="profile-copy"><strong>Ana Clara</strong><small>Bibliotecária</small></span>
            <ChevronDown size={15} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" aria-label="Abrir menu" onClick={() => setMobileNavOpen((open) => !open)}><Menu size={20} /></button>
          <div className="breadcrumb"><span>Biblioteca</span><span className="crumb-slash">/</span><strong>{page}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input aria-label="Buscar" placeholder="Buscar livros, alunos..." value={query} onChange={(event) => setQuery(event.target.value)} />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" aria-label="Notificações" onClick={() => setNotice('Você está em dia com as notificações.')}><Bell size={18} /><i /></button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="date-eyebrow"><span className="live-dot" />{new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()).toUpperCase()}</div>
              <h1>{pageTitles[page]?.[0] ?? 'Visão geral'}<span className="heading-period">.</span></h1>
              <p>{pageTitles[page]?.[1]}</p>
            </div>
            <button className="primary-button" onClick={() => setModal(page === 'Acervo' ? 'Adicionar título' : page === 'Alunos' ? 'Cadastrar aluno' : 'Novo empréstimo')}>
              <Plus size={17} /> {page === 'Acervo' ? 'Adicionar título' : page === 'Alunos' ? 'Cadastrar aluno' : 'Novo empréstimo'}
            </button>
          </div>

          {page === 'Visão geral' && <Dashboard loans={matchingLoans} query={query} onNavigate={changePage} onNewLoan={() => setModal('Novo empréstimo')} />}
          {page === 'Acervo' && <BookList books={matchingBooks} />}
          {page === 'Empréstimos' && <LoanList loans={matchingLoans} />}
          {page === 'Alunos' && <StudentList students={matchingStudents} />}
          {page === 'Relatórios' && <Reports />}
        </div>
      </main>

      {modal && <Modal title={modal} onClose={() => setModal(null)} onSubmit={submitModal} type={modal} books={catalog} students={students} />}
      {notice && <div className="toast" role="status"><Check size={17} />{notice}<button aria-label="Fechar aviso" onClick={() => setNotice('')}><X size={15} /></button></div>}
    </div>
  );
}

function Dashboard({ loans, query, onNavigate, onNewLoan }) {
  return (
    <>
      <section className="stats-grid" aria-label="Resumo da biblioteca">
        <StatCard icon={<BookOpen size={18} />} label="Livros no acervo" value="2.486" change="8,2%" trend="up" foot="em relação ao mês passado" tint="mint" />
        <StatCard icon={<ArrowRight size={18} />} label="Em circulação" value="184" change="12,5%" trend="up" foot="em relação ao mês passado" tint="yellow" />
        <StatCard icon={<Clock3 size={18} />} label="Devoluções hoje" value="12" change="3 pendentes" trend="neutral" foot="vencem até o fim do dia" tint="peach" />
        <StatCard icon={<UsersRound size={18} />} label="Leitores ativos" value="368" change="5,1%" trend="up" foot="em relação ao mês passado" tint="blue" />
      </section>

      <section className="feature-row">
        <div className="activity-panel panel">
          <div className="panel-heading">
            <div><h2>Movimento da biblioteca</h2><p>Empréstimos realizados nesta semana</p></div>
            <button className="select-button">Esta semana <ChevronDown size={14} /></button>
          </div>
          <div className="chart-summary"><strong>126</strong><span>empréstimos</span><span className="chart-trend"><ArrowUpRight size={14} /> 14,8%</span><small>vs. semana anterior</small></div>
          <div className="chart" aria-label="Gráfico de empréstimos por dia">
            {[['Seg', 54], ['Ter', 77], ['Qua', 64], ['Qui', 91], ['Sex', 69], ['Sáb', 43], ['Dom', 24]].map(([day, height], index) => (
              <div className="chart-column" key={day}><div className="bar-track"><div className={`bar ${index === 3 ? 'bar-highlight' : ''}`} style={{ height: `${height}%` }} /></div><span>{day}</span></div>
            ))}
          </div>
        </div>
        <div className="spotlight-panel">
          <div className="spotlight-photo" role="img" aria-label="Estante de livros iluminada pelo sol" />
          <div className="spotlight-content">
            <span className="spotlight-label"><Sparkles size={13} /> DESTAQUE DA SEMANA</span>
            <h2>Leituras que<br />abrem caminhos.</h2>
            <p>O clube do livro se encontra amanhã, às 14h.</p>
            <button onClick={onNewLoan}>Organizar encontro <ArrowRight size={15} /></button>
          </div>
          <span className="spotlight-number">01</span>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="loans-panel panel">
          <div className="panel-heading loans-heading">
            <div><h2>Empréstimos recentes</h2><p>As últimas movimentações do acervo</p></div>
            <button className="text-button" onClick={() => onNavigate('Empréstimos')}>Ver todos <ArrowRight size={15} /></button>
          </div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>ALUNO</th><th>LIVRO</th><th>RETIRADA</th><th>DEVOLUÇÃO</th><th>STATUS</th></tr></thead>
              <tbody>{loans.slice(0, 5).map((loan) => <LoanRow key={loan.id} loan={loan} />)}</tbody>
            </table>
            {loans.length === 0 && <EmptyState query={query} />}
          </div>
        </div>
        <div className="side-column">
          <div className="returns-panel panel">
            <div className="returns-heading"><div className="returns-icon"><Clock3 size={17} /></div><span>PRECISAM DE ATENÇÃO</span><button className="more-button" aria-label="Ver devoluções" onClick={() => onNavigate('Empréstimos')}>···</button></div>
            <strong className="return-count">03</strong>
            <p>livros passaram do prazo<br />de devolução</p>
            <button className="text-button attention-link" onClick={() => onNavigate('Empréstimos')}>Conferir atrasos <ArrowRight size={15} /></button>
          </div>
          <div className="quote-panel">
            <span className="quote-mark">“</span>
            <p>Um livro é um sonho que você segura nas mãos.</p>
            <small>NEIL GAIMAN</small>
          </div>
        </div>
      </section>
      <div className="page-footer"><span>Feito para quem acredita que toda história merece ser encontrada.</span><span>Biblioteca Aurora <i>✳</i> 2024</span></div>
    </>
  );
}

function StatCard({ icon, label, value, change, trend, foot, tint }) {
  return <article className="stat-card"><div className={`stat-icon ${tint}`}>{icon}</div><span className="stat-label">{label}</span><strong className="stat-value">{value}</strong><div className="stat-foot"><span className={`stat-change ${trend}`}>{trend === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}</span><span>{foot}</span></div></article>;
}

function LoanRow({ loan }) {
  return <tr><td><div className="student-cell"><span className={`student-avatar avatar-${loan.initials.charCodeAt(0) % 5}`}>{loan.initials}</span><strong>{loan.student}</strong><small>{loan.class}</small></div></td><td className="book-cell">{loan.book}</td><td>{loan.date}</td><td>{loan.due}</td><td><span className={`status-pill ${loan.tone}`}>{loan.tone === 'coral' && <i />}{loan.status}</span></td></tr>;
}

function BookList({ books: items }) {
  return <section className="panel list-panel"><div className="list-toolbar"><div><strong>{items.length}</strong> títulos encontrados</div><button className="select-button"><Settings2 size={14} /> Filtrar</button></div><div className="table-scroll"><table><thead><tr><th>TÍTULO</th><th>CATEGORIA</th><th>EXEMPLARES</th><th>DISPONÍVEIS</th><th>STATUS</th></tr></thead><tbody>{items.map((book, index) => <tr key={book.title}><td><div className="book-title-cell"><span className={`book-cover cover-${index % 5}`}><BookOpen size={17} /></span><span><strong>{book.title}</strong><small>{book.author}</small></span></div></td><td>{book.category}</td><td>{book.copies}</td><td>{book.available}</td><td><span className={`status-pill ${book.available ? 'green' : 'coral'}`}>{book.available ? 'Disponível' : 'Esgotado'}</span></td></tr>)}</tbody></table>{items.length === 0 && <EmptyState query="" />}</div></section>;
}

function LoanList({ loans: items }) {
  return <section className="panel list-panel"><div className="list-toolbar"><div><strong>{items.length}</strong> empréstimos encontrados</div><button className="select-button"><Settings2 size={14} /> Filtrar</button></div><div className="table-scroll"><table><thead><tr><th>ALUNO</th><th>LIVRO</th><th>RETIRADA</th><th>DEVOLUÇÃO</th><th>STATUS</th></tr></thead><tbody>{items.map((loan) => <LoanRow key={loan.id} loan={loan} />)}</tbody></table>{items.length === 0 && <EmptyState query="" />}</div></section>;
}

function StudentList({ students: items }) {
  return <section className="panel list-panel"><div className="list-toolbar"><div><strong>{items.length}</strong> alunos encontrados</div><button className="select-button"><Settings2 size={14} /> Filtrar turma</button></div><div className="table-scroll"><table><thead><tr><th>ALUNO</th><th>TURMA</th><th>EMPRÉSTIMOS ATIVOS</th><th>STATUS</th></tr></thead><tbody>{items.map((student) => <tr key={student.name}><td><div className="student-cell"><span className={`student-avatar avatar-${student.initials.charCodeAt(0) % 5}`}>{student.initials}</span><strong>{student.name}</strong></div></td><td>{student.class}</td><td>{student.active}</td><td><span className="status-pill green">{student.status}</span></td></tr>)}</tbody></table>{items.length === 0 && <EmptyState query="" />}</div></section>;
}

function Reports() {
  return <div className="reports-grid"><article className="report-card"><span className="report-kicker">MAIS PROCURADO</span><strong>O Pequeno Príncipe</strong><p>34 empréstimos neste mês</p><div className="report-line"><i style={{ width: '84%' }} /></div></article><article className="report-card"><span className="report-kicker">TURMA MAIS LEITORA</span><strong>8º ano A</strong><p>42 livros retirados neste mês</p><div className="report-line coral-line"><i style={{ width: '68%' }} /></div></article><article className="report-card"><span className="report-kicker">TAXA DE DEVOLUÇÃO</span><strong>96,4%</strong><p>Devoluções feitas dentro do prazo</p><div className="report-line yellow-line"><i style={{ width: '96%' }} /></div></article></div>;
}

function EmptyState({ query }) {
  return <div className="empty-state"><Search size={20} /><strong>Nenhum resultado encontrado</strong><span>{query ? 'Tente buscar por outro nome ou título.' : 'Ainda não há registros para exibir.'}</span></div>;
}

function Modal({ title, onClose, onSubmit, type, books: catalog, students: studentList }) {
  const isLoan = type === 'Novo empréstimo';
  const isBook = type === 'Adicionar título';
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="modal" onSubmit={onSubmit}>
    <div className="modal-heading"><div><span className="modal-icon"><Plus size={18} /></span><h2>{title}</h2></div><button type="button" className="icon-button" aria-label="Fechar" onClick={onClose}><X size={18} /></button></div>
    <p className="modal-description">{isLoan ? 'Registre a retirada de um livro por um estudante.' : isBook ? 'Inclua um novo título no acervo da biblioteca.' : 'Adicione um estudante à comunidade de leitores.'}</p>
    {isLoan ? <>
      <label className="field-label">Aluno<select name="student" required defaultValue=""><option value="" disabled>Selecione um aluno</option>{studentList.map((student) => <option key={student.name}>{student.name}</option>)}</select></label>
      <label className="field-label">Livro<select name="book" required defaultValue=""><option value="" disabled>Selecione um título</option>{catalog.filter((book) => book.available > 0).map((book) => <option key={book.title}>{book.title}</option>)}</select></label>
      <div className="due-note"><Clock3 size={15} /> Prazo padrão de devolução: 7 dias</div>
    </> : <>
      <label className="field-label">{isBook ? 'Título do livro' : 'Nome completo'}<input name="name" required placeholder={isBook ? 'Ex.: A menina que roubava livros' : 'Ex.: Joana Silva'} /></label>
      <label className="field-label">{isBook ? 'Autor(a)' : 'Turma'}<input name="detail" required placeholder={isBook ? 'Nome do autor' : 'Ex.: 7º A'} /></label>
      {isBook && <label className="field-label">Quantidade de exemplares<input name="copies" type="number" min="1" defaultValue="1" required /></label>}
    </>}
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancelar</button><button type="submit" className="primary-button"><Check size={16} /> Confirmar</button></div>
  </form></div>;
}

export default App;