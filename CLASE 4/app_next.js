// Selecciona el elemento del DOM con el ID "app", donde se renderizará la aplicación React
const app = document.getElementById("app")

// Componente Header
// Este componente recibe un "prop" llamado "title" y lo muestra dentro de un elemento <h1>
// Si no se pasa un "title" como prop, mostrará "Default title"
function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>
}

// Componente principal HomePage
// Este componente es la página principal que contiene todos los elementos que se verán en la interfaz de usuario
function HomePage() {
  // Un array de nombres que se mostrará como una lista en la página
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

  // Estado "likes" que se inicializa en 0, y su función actualizadora "setLikes"
  const [likes, setLikes] = React.useState(0)

  // Función que se ejecuta cuando se hace clic en el botón "Like"
  // Incrementa el contador de "likes" en 1 cada vez que se llama
  function handleClick() {
    setLikes(likes + 1)
  }

  // Renderizado del contenido principal de la página
  return (
    <div>
      {/* Se usa el componente Header y se le pasa el prop "title" */}
      <Header title="Develop. Preview. Ship." />

      {/* Genera una lista <ul> con los nombres del array "names" */}
      <ul>
        {names.map((name) => (
          // Cada nombre se convierte en un elemento <li>, usando el nombre como "key" para mantener un identificador único
          <li key={name}>{name}</li>
        ))}
      </ul>

      {/* Botón "Like" que muestra la cantidad de "likes" y ejecuta la función handleClick cuando se hace clic */}
      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  )
}

// Crea un "root" para la aplicación React dentro del elemento "app" del DOM
const root = ReactDOM.createRoot(app);

// Renderiza el componente HomePage en el "root" de la aplicación
root.render(<HomePage />);
