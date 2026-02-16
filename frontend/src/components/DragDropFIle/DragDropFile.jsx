import { useDropzone } from "react-dropzone";

export default function DragDrop(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div
        {...getRootProps({
          onDragOver: (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = "copy"; // Isso força o ícone de "+" ou "copiar" no mouse
            console.log("Arquivo sobre a zona!");
          },
        })}
      >
        <input {...getInputProps()} />
        <p>Arraste e Solte seu arquivo json aqui</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}
