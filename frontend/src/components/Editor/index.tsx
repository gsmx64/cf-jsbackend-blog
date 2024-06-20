import { useMemo } from 'react';
import { useTheme } from 'react-hook-theme';
import JoditEditor from 'jodit-react';


const Editor = ({ toolbarMode, defaultValue, placeholder, 
  handleWYSIWYGChange }: any) => {
  const { theme, } = useTheme();

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
        theme: (theme === 'dark') ? 'dark' : 'default',
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
      theme:(theme === 'dark') ? 'dark' : 'default',
    }
  },[placeholder]);

  return (
    <>
      <JoditEditor
        config={config}
        onChange={handleWYSIWYGChange}
        value={defaultValue || ''}
      />
    </>
  );
};

export default Editor;