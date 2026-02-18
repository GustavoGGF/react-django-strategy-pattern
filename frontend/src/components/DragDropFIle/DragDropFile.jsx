import { useDropzone } from "react-dropzone";
import "./DragDropFile.css";
import { InputDataFileContext } from "../../context/InputDataFileContext";
import { useContext, useEffect } from "react";

export default function DragDrop(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const { setExistFile, setSelectedFile } = useContext(InputDataFileContext);

  useEffect(() => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setExistFile(true);
      setSelectedFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container mt-5">
      <div
        className="container-bd w15h1"
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
