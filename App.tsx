import React, { useState } from 'react';
import homologLogo from './homolog.png';

// --- Serviços ---

/**
 * Envia os dados do lead para a API.
 * @param data - Os dados do lead (nome e telefone).
 */
const sendLead = async (data: { name: string; phone: string }): Promise<void> => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  if (!apiUrl) {
    console.error('URL da API não configurada');
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar para API');
    }
  } catch (error) {
    console.error('Erro ao enviar para API:', error);
    // Opcional: Adicionar lógica para notificar o usuário sobre o erro no envio do formulário.
  }
};


// --- Utilitários ---

/**
 * Força o download de um arquivo.
 * @param url - A URL do arquivo.
 * @param filename - O nome do arquivo a ser salvo.
 */
const downloadPdf = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


// --- Componentes de Ícone ---

interface IconProps {
  className?: string;
}

const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

// --- Componentes da UI ---

const HomologSolarLogo = () => (
  <div className="flex flex-col items-center mb-8">
    <img src={homologLogo} alt="Homolog Solar Logo" className="w-16 h-16 mb-3 shadow-md rounded-md" />
    <div className="text-center font-roboto-slab">
      <span className="text-3xl text-[#002D5B]">Homolog </span>
      <span className="text-3xl text-[#002D5B] font-bold">Solar</span>
    </div>
  </div>
);

const ThankYouPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center">
      <h2 className="text-2xl font-bold mb-4 text-[#002D5B]">Obrigado!</h2>
      <p className="mb-4">Seu download começou.<br />Aproveite o checklist!</p>
      <button
        className="mt-2 px-6 py-2 bg-[#f37021] text-white rounded-lg font-bold hover:bg-[#d9651d] transition"
        onClick={onClose}
      >
        Fechar
      </button>
    </div>
  </div>
);

const LandingPage: React.FC<{ onCaptureSuccess: (e: React.FormEvent<HTMLFormElement>) => void }> = ({ onCaptureSuccess }) => (
  <main className="bg-slate-50 min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full mx-auto overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
      
      {/* Coluna da Esquerda: Visuais e Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-slate-100 p-8">
        <HomologSolarLogo />
        <img 
            src="https://segundaviadecontas.com.br/wp-content/uploads/2019/05/2-segunda-via-de-contas-fatura-energisa.jpg" 
            alt="logo da Energisa" 
            className="rounded-lg shadow-2xl max-w-sm w-full transform transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Coluna da Direita: Conteúdo e Formulário */}
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <h1 className="font-bold text-3xl sm:text-4xl text-[#002D5B] font-roboto-slab leading-tight">
          Chega de Atrasos na Homologação de Projetos Solares!
        </h1>
        <p className="text-slate-600 mt-4 text-lg">
          Baixe o checklist completo para a <span className="font-bold text-[#f37021]">Energisa</span> e garanta aprovações rápidas, sem erros e sem dor de cabeça.
        </p>

        <ul className="mt-8 space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Evite os <span className="font-semibold">erros mais comuns</span> que causam reprovações e atrasos.</span>
            </li>
            <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Tenha em mãos a <span className="font-semibold">lista exata de documentos e fotos</span> obrigatórias em alta resolução.</span>
            </li>
            <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Domine o <span className="font-semibold">fluxo de 7 etapas</span> para o sucesso da aprovação do seu projeto.</span>
            </li>
             <li className="flex items-start gap-3">
                <CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>Libere seu tempo para o que realmente importa: <span className="font-semibold">vender e instalar!</span></span>
            </li>
        </ul>

        <form onSubmit={onCaptureSuccess} className="mt-8 space-y-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
            <p className="font-bold text-center text-md text-[#002D5B]">Preencha seus dados para receber o guia definitivo:</p>
            <div className="relative">
                <UserIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input type="text" name="name" placeholder="Seu nome" required aria-label="Seu nome" className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#fcc946] focus:border-[#fcc946] transition duration-300" />
            </div>
            <div className="relative">
                <PhoneIcon className="w-5 h-5 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
                <input type="tel" name="phone" placeholder="Seu telefone com DDD" required aria-label="Seu telefone com DDD" className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#fcc946] focus:border-[#fcc946] transition duration-300" />
            </div>
            <button type="submit" className="w-full bg-[#f37021] text-white font-bold text-lg py-4 px-6 rounded-lg shadow-lg hover:bg-[#d9651d] transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-[#f37021]/50">
                QUERO MEU CHECKLIST AGORA!
            </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-4">
          100% Gratuito. Respeitamos sua privacidade.
        </p>
      </div>
    </div>
  </main>
);


// --- Componente Principal ---

export default function App() {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleCaptureSuccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;

    // 1. Baixa o PDF imediatamente
    downloadPdf('/Checklist_HomologSolar_Energisa.pdf', 'Checklist_HomologSolar_Energisa.pdf');

    // 2. Mostra popup de agradecimento
    setShowThankYou(true);

    // 3. Envia para a API em segundo plano
    sendLead({ name, phone });
  };

  return (
    <>
      {showThankYou && <ThankYouPopup onClose={() => setShowThankYou(false)} />}
      <LandingPage onCaptureSuccess={handleCaptureSuccess} />
    </>
  );
}