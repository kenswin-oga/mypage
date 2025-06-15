import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

export const HomePage = () => {
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<{index: number, isCorrect: boolean} | null>(null);
  const [developerMode, setDeveloperMode] = useState({
    focus: 78,
    caffeine: 92,
    codeMood: 65
  });

  // データ定義
  const triviaList = [
    "JavaScriptの配列は実はオブジェクトで、typeof [] は \"object\" を返します。",
    "CSSの「cascading」は「滝のように流れる」という意味で、スタイルの継承を表現しています。",
    "HTTPSの「S」はSecureではなく「Secure Socket Layer」のSecureです。",
    "GitHubの「Hub」は車輪のハブから来ており、開発の中心地という意味があります。",
    "プログラミング言語「Python」は、コメディ番組「Monty Python」から名付けられました。",
    "世界初のバグ（Bug）は実際に虫で、1947年にコンピューターから発見されました。",
    "「Hello, World!」プログラムは1978年の「The C Programming Language」で普及しました。",
    "インターネットの最初のドメイン名は「symbolics.com」で、1985年に登録されました。"
  ];

  const gameQuestions = [
    {
      question: "1 + 1 をバイナリで表現すると？",
      options: ["01", "10", "11"],
      correct: 1
    },
    {
      question: "HTMLで改行を表すタグは？",
      options: ["<break>", "<br>", "<newline>"],
      correct: 1
    },
    {
      question: "CSSで中央揃えに使うプロパティは？",
      options: ["center", "text-align", "align"],
      correct: 1
    },
    {
      question: "JavaScriptで配列の長さを取得するには？",
      options: [".length", ".size", ".count"],
      correct: 0
    },
    {
      question: "HTTPステータス404の意味は？",
      options: ["サーバーエラー", "見つからない", "アクセス拒否"],
      correct: 1
    }
  ];

  const posts = [
    {
      title: "React HooksとState管理の深掘り実験",
      date: "2025-05-30",
      excerpt: "カスタムフックを使った状態管理の実験結果。パフォーマンス測定とベンチマークも含めて詳しく解説します。",
      tags: ["React", "Hooks", "Performance"]
    },
    {
      title: "WebGLでリアルタイム物理シミュレーション",
      date: "2025-05-28",
      excerpt: "Three.jsとCannonを使って重力シミュレーションを実装。フレームレート最適化の技法も紹介します。",
      tags: ["WebGL", "Three.js", "Physics"]
    },
    {
      title: "Rustで作るWebAssemblyパフォーマンステスト",
      date: "2025-05-25",
      excerpt: "JavaScriptとWASMの速度比較実験。数値計算からDOM操作まで様々なケースで検証してみました。",
      tags: ["Rust", "WebAssembly", "Benchmark"]
    },
    {
      title: "機械学習モデルをWebブラウザで動かす",
      date: "2025-05-22",
      excerpt: "TensorFlow.jsを使ってブラウザ上でリアルタイム画像認識。モデルの最適化と推論速度の向上について。",
      tags: ["ML", "TensorFlow.js", "Computer Vision"]
    }
  ];

  const projects = [
    {
      title: "Neural Network Visualizer",
      date: "進行中",
      excerpt: "ニューラルネットワークの学習過程をリアルタイムで可視化するツール。重みの変化やバックプロパゲーションを視覚的に理解できます。",
      tags: ["ML", "Visualization", "D3.js"]
    },
    {
      title: "Live Code Editor",
      date: "2025-05",
      excerpt: "Monaco EditorとWeb Workersを使ったリアルタイムコード実行環境。シンタックスハイライトと自動補完付き。",
      tags: ["Editor", "WebWorkers", "Monaco"]
    },
    {
      title: "タスク管理アプリ「TaskFlow」",
      date: "2025-04",
      excerpt: "React + TypeScriptで構築したシンプルなタスク管理ツール。ドラッグ&ドロップでの並び替えや締切通知機能を実装。",
      tags: ["React", "TypeScript", "Firebase"]
    },
    {
      title: "Algorithmic Art Generator",
      date: "2025-03",
      excerpt: "Canvas APIを使った生成アート。フラクタル、パーリンノイズ、セルラーオートマトンなどのアルゴリズムを実装。",
      tags: ["Canvas", "Art", "Algorithm"]
    },
    {
      title: "レシピ検索API「CookieAPI」",
      date: "2025-02",
      excerpt: "Node.js + Expressで作成したレシピ検索API。材料からレシピを検索できる機能を提供しています。",
      tags: ["Node.js", "Express", "MongoDB"]
    },
    {
      title: "天気予報ウィジェット",
      date: "2025-01",
      excerpt: "バニラJavaScriptで作成した天気予報表示ウィジェット。OpenWeather APIを使用してリアルタイム情報を取得。",
      tags: ["JavaScript", "CSS", "API"]
    }
  ];

  const techStack = [
    { icon: "⚛️", name: "React", level: "★★★" },
    { icon: "🟦", name: "TypeScript", level: "★★★" },
    { icon: "🚀", name: "Next.js", level: "★★☆" },
    { icon: "🦀", name: "Rust", level: "★☆☆" },
    { icon: "🐍", name: "Python", level: "★★☆" },
    { icon: "⚡", name: "WebGL", level: "★☆☆" }
  ];

  const books = [
    {
      title: "「Clean Architecture」",
      rating: "★★★★☆",
      note: "依存関係の整理について目から鱗"
    },
    {
      title: "「Rust in Action」",
      rating: "★★★☆☆",
      note: "所有権の概念が面白い。まだ消化中"
    }
  ];

  // 開発者モードの自動更新
  useEffect(() => {
    const interval = setInterval(() => {
      setDeveloperMode({
        focus: Math.floor(Math.random() * 30 + 60),
        caffeine: Math.floor(Math.random() * 30 + 70),
        codeMood: Math.floor(Math.random() * 35 + 50)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showNextTrivia = () => {
    setCurrentTriviaIndex((prev) => (prev + 1) % triviaList.length);
  };

  const checkAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === gameQuestions[currentQuestionIndex].correct;
    setSelectedAnswer({ index: selectedIndex, isCorrect });
    
    if (isCorrect) {
      setGameScore(prev => prev + 1);
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % gameQuestions.length);
      setSelectedAnswer(null);
    }, 1500);
  };

  const createParticles = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #007bff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
      `;
      document.body.appendChild(particle);
      
      particle.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-40px) scale(0)', opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  };

  return (
    <>
      <style>{`
        @keyframes rainbow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes underline {
          to { width: 100%; }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .rainbow-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #007bff, #28a745, #ffc107, #dc3545);
          animation: rainbow 3s linear infinite;
        }

        .logo-underline {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: #007bff;
          animation: underline 2s ease-in-out forwards;
        }

        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(40, end) forwards;
          border-right: 2px solid #007bff;
        }

        .section-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #007bff;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .section-hover:hover::before {
          transform: translateX(0);
        }

        .item-hover {
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .item-hover::before {
          content: '';
          position: absolute;
          left: -30px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: transparent;
          transition: background 0.3s ease;
        }

        .item-hover:hover {
          background: #f8f9ff;
          margin: 0 -20px;
          padding: 20px;
          border-radius: 8px;
          transform: translateX(5px);
        }

        .item-hover:hover::before {
          background: #007bff;
        }

        .blinking {
          animation: blink 1s infinite;
        }
      `}</style>

      <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", lineHeight: 1.6, color: '#333', background: '#f8f9fa', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          {/* Header */}
          <header style={{ 
            textAlign: 'center', 
            marginBottom: '50px', 
            padding: '60px 0', 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            border: '1px solid #eee', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
            
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#333', marginBottom: '15px', position: 'relative', display: 'inline-block' }}>
              つくったものログ
              <div className="logo-underline"></div>
            </div>
            
            <div className="typing-text" style={{ color: '#666', fontSize: '1.2rem', fontWeight: 400, marginBottom: '20px' }}>
              日々の積み上げとアウトプットの記録用ページ
            </div>

            <nav style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              {['ホーム', '記事', 'ガラクタ箱', '管理'].map((item, index) => (
                <a key={index} href="#" style={{ 
                  color: index === 0 ? '#007bff' : '#666', 
                  textDecoration: 'none', 
                  fontWeight: 500, 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  backgroundColor: index === 0 ? '#e3f2fd' : 'transparent',
                  transition: 'all 0.2s ease' 
                }}>
                  {item}
                </a>
              ))}
            </nav>
          </header>

          {/* Main Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px', marginBottom: '40px' }}>
            {/* Primary Sections */}
            <div style={{ display: 'grid', gap: '30px' }}>
              {/* Posts Section */}
              <div className="section-hover" style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '30px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                border: '1px solid #eee', 
                position: 'relative', 
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#007bff', fontFamily: "'Courier New', monospace" }}>//</span>
                    最新の投稿
                  </h2>
                  <a href="#" style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                    すべて見る →
                  </a>
                </div>

                <ul style={{ listStyle: 'none' }}>
                  {posts.map((post, index) => (
                    <li key={index} className="item-hover" style={{ padding: '20px 0', borderBottom: index < posts.length - 1 ? '1px solid #f5f5f5' : 'none' }}
                        onClick={(e) => createParticles(e.currentTarget)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', flex: 1, marginRight: '15px' }}>
                          {post.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#999', whiteSpace: 'nowrap', fontFamily: "'Courier New', monospace" }}>
                          {post.date}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.5, marginBottom: '12px' }}>
                        {post.excerpt}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} style={{ 
                            background: '#e9ecef', 
                            color: '#495057', 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem', 
                            border: '1px solid #dee2e6', 
                            fontFamily: "'Courier New', monospace" 
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects Section */}
              <div className="section-hover" style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '30px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                border: '1px solid #eee', 
                position: 'relative', 
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#007bff', fontFamily: "'Courier New', monospace" }}>//</span>
                    ガラクタ箱
                  </h2>
                  <a href="#" style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
                    すべて見る →
                  </a>
                </div>

                <ul style={{ listStyle: 'none' }}>
                  {projects.map((project, index) => (
                    <li key={index} className="item-hover" style={{ padding: '20px 0', borderBottom: index < projects.length - 1 ? '1px solid #f5f5f5' : 'none' }}
                        onClick={(e) => createParticles(e.currentTarget)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', flex: 1, marginRight: '15px' }}>
                          {project.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#999', whiteSpace: 'nowrap', fontFamily: "'Courier New', monospace" }}>
                          {project.date}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.5, marginBottom: '12px' }}>
                        {project.excerpt}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} style={{ 
                            background: '#e9ecef', 
                            color: '#495057', 
                            padding: '4px 10px', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem', 
                            border: '1px solid #dee2e6', 
                            fontFamily: "'Courier New', monospace" 
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div style={{ display: 'grid', gap: '25px' }}>
              {/* Challenge Widget */}
              <div style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🎯 今月のチャレンジ
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: 500 }}>
                    Rust でWebアプリケーション構築
                  </div>
                  <div style={{ background: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '5px' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #007bff, #0056b3)', width: '65%', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: "'Courier New', monospace" }}>
                    65% 完了 (13/20日)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.9rem', color: '#333', marginBottom: '8px', fontWeight: 500 }}>
                    機械学習アルゴリズム理解
                  </div>
                  <div style={{ background: '#e9ecef', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '5px' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #007bff, #0056b3)', width: '40%', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: "'Courier New', monospace" }}>
                    40% 完了 (8/20日)
                  </div>
                </div>
              </div>

              {/* Tech Stack Widget */}
              <div style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🔧 技術スタック
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {techStack.map((tech, index) => (
                    <div key={index} style={{ 
                      textAlign: 'center', 
                      padding: '15px 8px', 
                      background: '#f8f9fa', 
                      borderRadius: '8px', 
                      transition: 'all 0.2s ease', 
                      cursor: 'pointer', 
                      border: '1px solid #eee' 
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{tech.icon}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 500 }}>{tech.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#ffc107', marginTop: '2px' }}>{tech.level}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trivia Widget */}
              <div style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  💡 ランダム豆知識
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: '#333', 
                    lineHeight: 1.5, 
                    marginBottom: '15px', 
                    padding: '15px', 
                    background: '#f8f9fa', 
                    borderRadius: '6px', 
                    borderLeft: '3px solid #007bff' 
                  }}>
                    {triviaList[currentTriviaIndex]}
                  </p>
                  <button 
                    onClick={showNextTrivia}
                    style={{ 
                      background: '#007bff', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 16px', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      fontSize: '0.8rem', 
                      transition: 'background 0.2s ease' 
                    }}
                  >
                    次の豆知識 🎲
                  </button>
                </div>
              </div>

              {/* Books Widget */}
              <div style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📚 読書メモ
                </div>
                
                {books.map((book, index) => (
                  <div key={index} style={{ 
                    marginBottom: index < books.length - 1 ? '15px' : '0', 
                    paddingBottom: index < books.length - 1 ? '15px' : '0', 
                    borderBottom: index < books.length - 1 ? '1px solid #f0f0f0' : 'none' 
                  }}>
                    <div style={{ fontSize: '0.9rem', color: '#333', fontWeight: 600, marginBottom: '5px' }}>
                      {book.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ffc107', marginBottom: '5px' }}>
                      {book.rating}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: 1.4, fontStyle: 'italic' }}>
                      {book.note}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Game Widget */}
              <div style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🎮 ミニゲーム
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.9rem', color: '#333', marginBottom: '15px', fontWeight: 500 }}>
                    {gameQuestions[currentQuestionIndex].question}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '15px' }}>
                    {gameQuestions[currentQuestionIndex].options.map((option, index) => (
                      <button 
                        key={index}
                        onClick={() => checkAnswer(index)}
                        disabled={selectedAnswer !== null}
                        style={{ 
                          background: selectedAnswer?.index === index 
                            ? selectedAnswer.isCorrect ? '#d4edda' : '#f8d7da'
                            : '#f8f9fa',
                          border: `1px solid ${selectedAnswer?.index === index 
                            ? selectedAnswer.isCorrect ? '#c3e6cb' : '#f5c6cb'
                            : '#dee2e6'}`,
                          color: selectedAnswer?.index === index 
                            ? selectedAnswer.isCorrect ? '#155724' : '#721c24'
                            : '#333',
                          padding: '8px 12px', 
                          borderRadius: '6px', 
                          cursor: selectedAnswer !== null ? 'not-allowed' : 'pointer', 
                          fontSize: '0.8rem', 
                          transition: 'all 0.2s ease' 
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontFamily: "'Courier New', monospace" }}>
                    スコア: <span style={{ fontWeight: 600 }}>{gameScore}</span>
                  </div>
                </div>
              </div>

              {/* Developer Mode Widget */}
              <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eee', borderLeft: '3px solid #28a745' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🌡️ 開発者モード
                </div>
                
                {[
                  { label: '集中度', value: developerMode.focus, color: 'linear-gradient(90deg, #007bff, #0056b3)' },
                  { label: 'カフェイン', value: developerMode.caffeine, color: 'linear-gradient(90deg, #dc3545, #c82333)' },
                  { label: 'コードの調子', value: developerMode.codeMood, color: 'linear-gradient(90deg, #28a745, #1e7e34)' }
                ].map((meter, index) => (
                  <div key={index} style={{ marginBottom: index < 2 ? '15px' : '0' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{meter.label}</span>
                      <span style={{ fontSize: '0.7rem', color: '#333', fontFamily: "'Courier New', monospace", textAlign: 'right' }}>
                        {meter.value}%
                      </span>
                    </div>
                    <div style={{ background: '#e9ecef', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '3px' }}>
                      <div style={{ 
                        height: '100%', 
                        background: meter.color,
                        width: `${meter.value}%`, 
                        borderRadius: '3px', 
                        transition: 'width 0.3s ease' 
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Actions */}
          <div style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button style={{ 
              width: '56px', 
              height: '56px', 
              background: '#007bff', 
              border: 'none', 
              borderRadius: '50%', 
              color: 'white', 
              fontSize: '20px', 
              cursor: 'pointer', 
              boxShadow: '0 4px 12px rgba(0,123,255,0.3)', 
              transition: 'all 0.3s ease' 
            }}>
              +
            </button>
            <button style={{ 
              width: '56px', 
              height: '56px', 
              background: '#6c757d', 
              border: 'none', 
              borderRadius: '50%', 
              color: 'white', 
              fontSize: '16px', 
              cursor: 'pointer', 
              boxShadow: '0 4px 12px rgba(108,117,125,0.3)', 
              transition: 'all 0.3s ease' 
            }}>
              ⚙
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// DOM要素にマウント
const container = document.getElementById('homepage');
if (container) {
  const root = createRoot(container);

  document.addEventListener('DOMContentLoaded', () => {
    root.render(<HomePage />);
  });
}