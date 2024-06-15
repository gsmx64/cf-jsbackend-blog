import { useRef, useMemo } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';


function preparePaste(jodit: Jodit) {
  jodit.e.on(
    'paste',
    (e: ClipboardEvent | DragEvent) => {
      if (confirm('Change pasted content?')) {
        jodit.e.stopPropagation('paste');
        const dataTransfer = Jodit.modules.Helpers.getDataTransfer(e);
        const data = dataTransfer?.getData(Jodit.constants.TEXT_HTML);
        if (data) {
          jodit.s.insertHTML(data.replace(/a/g, 'b'));
        }
        return false;
      }
    },
    { top: true }
  );
}
Jodit.plugins.add('preparePaste', preparePaste);

const Editor = ({ toolbarMode, defaultValue, placeholder, 
  handleWYSIWYGChange }: any) => { 
  const editorRef = useRef(null);

  const options = [ 'bold', 'italic', '|', 'ul', 'ol', '|', 'font',
    'fontsize', '|', 'outdent', 'indent', 'align', '|', 'hr', '|',
    'fullsize', 'brush', '|', 'table', 'link', '|', 'undo', 'redo',];

  const config: any = (toolbarMode === 'full') ?
  useMemo(() => {
      return {
        readonly: false,
        spellcheck: true,
        placeholder: placeholder || 'Start typings...',
        defaultActionOnPaste: 'insert_as_html',
        defaultLineHeight: 1.0,
        enter: 'div',
        statusbar: true,
        sizeLG: 900,
        sizeMD: 700,
        sizeSM: 400,
        toolbar: true,
        toolbarAdaptive: false,
        toolbarButtonSize: 'medium',
        minHeight: 600,
        language: 'en',
        theme:'dark',
      }
    },[placeholder])
  :
  useMemo(() => {
    return {
      readonly: false,
      placeholder: placeholder || 'Start typings...',
      defaultActionOnPaste: 'insert_as_html',
      defaultLineHeight: 1.0,
      enter: 'div',
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbar: true,
      toolbarAdaptive: false,
      language: 'en',
      theme:'dark',
    }
  },[placeholder]);

  return (
    <>
      <JoditEditor
        ref={editorRef}
        config={config}
        onChange={handleWYSIWYGChange}
        value={defaultValue || ''}
      />
    </>
  );
};

export default Editor;