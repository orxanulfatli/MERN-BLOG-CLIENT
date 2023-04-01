import React, { useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch } from "../../../hooks/redux";
import { alertAC } from '../../../Global/alert/alertSlice';
import {validateImage} from '../../../utils/validate'
import {  imageUpload } from "../../../services/authService";

interface IProps {
    setBody: (value: string) => void;
    
}

const Quill: React.FC<IProps> = ({setBody}) => {
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill>(null);

  const modules = { toolbar: { container } };

  // Custom image
  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files)
        return dispatch(alertAC.error({message:'File does not exist'}));

      const file = files[0];
      const check = validateImage(file);
      if (!check) return dispatch(alertAC.error({message:'max image size is 1mb'}));

      dispatch(alertAC.startLoading());
      const photo = await imageUpload(file);

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
      }

      dispatch(alertAC.stopLoading())
    };
  }, [dispatch]);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."     
        onChange={(e) => setBody(e)}
        ref={quillRef}
      />
    </div>
  );
};

let container = [
  [{ font: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ align: [] }],

  ["clean", "link", "image", "video"],
];

export default Quill