export default function Home() {
  const cards = [
    { href: '/original.html', number: '01', title: 'Elegância Financeira', description: 'Azul-marinho, dourado e uma narrativa segura e sofisticada.', color: '#e9b44c', background: '#071e24' },
    { href: '/versao-2.html', number: '02', title: 'Editorial Acolhedora', description: 'Areia, vinho e verde-oliva para uma presença humana e consultiva.', color: '#f1d39e', background: '#713b35' },
    { href: '/versao-3.html', number: '03', title: 'Finance Tech Premium', description: 'Azul profundo, violeta e ciano com linguagem contemporânea.', color: '#72f5e7', background: '#17143b' }
  ];
  return <main style={{minHeight:'100vh',background:'#f5f2eb',color:'#071e24',fontFamily:'Arial, sans-serif',padding:'64px 24px',boxSizing:'border-box'}}>
    <section style={{maxWidth:1120,margin:'0 auto'}}>
      <p style={{fontSize:12,fontWeight:700,letterSpacing:3,textTransform:'uppercase',color:'#0f766e'}}>Apresentação visual</p>
      <h1 style={{fontSize:'clamp(40px,7vw,76px)',lineHeight:1.02,letterSpacing:'-0.055em',maxWidth:850,margin:'18px 0'}}>Três caminhos para a marca Cristiane Cirrilo.</h1>
      <p style={{maxWidth:650,fontSize:18,lineHeight:1.7,color:'rgba(7,30,36,.62)',marginBottom:48}}>Selecione uma proposta para navegar pela landing page completa. Todas são responsivas e possuem as mesmas funcionalidades.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
        {cards.map(card => <a key={card.number} href={card.href} style={{display:'flex',minHeight:300,flexDirection:'column',justifyContent:'space-between',padding:30,borderRadius:24,background:card.background,color:'white',textDecoration:'none',boxShadow:'0 20px 50px rgba(7,30,36,.12)'}}>
          <span style={{fontSize:12,letterSpacing:2,color:card.color}}>PROPOSTA {card.number}</span>
          <div><h2 style={{fontSize:28,lineHeight:1.1,margin:'0 0 12px'}}>{card.title}</h2><p style={{lineHeight:1.6,color:'rgba(255,255,255,.62)',margin:0}}>{card.description}</p></div>
          <span style={{fontWeight:700,color:card.color}}>Abrir proposta →</span>
        </a>)}
      </div>
    </section>
  </main>;
}
