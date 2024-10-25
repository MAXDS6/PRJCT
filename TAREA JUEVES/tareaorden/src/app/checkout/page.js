"use client";

import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();

  const goBack = () => {
    router.push('/'); // Redirige de vuelta a la página principal
  };

  return (
    <div>
      <h1>Página de Pago</h1>
      <p>Aquí puedes finalizar tu compra.</p>
      <button onClick={goBack}>Volver a la página principal</button>
    </div>
  );
}
