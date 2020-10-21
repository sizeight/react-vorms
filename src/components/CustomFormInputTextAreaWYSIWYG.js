import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Editor, EditorState, RichUtils, getDefaultKeyBinding,
} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { stateToHTML } from 'draft-js-export-html';


const propTypes = {
  // id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // required: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  // invalid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

const defaultProps = {
  // required: false,
  value: '',
  placeholder: '',
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

const CustomFormInputTextAreaWYSIWYG = (props) => {
  const { value } = props;


  const [editorState, setEditorState] = useState(EditorState.createWithContent(
    stateFromHTML(value),
  ));
  const [markupState, setMarkupState] = useState(value);
  const [preview, setPreview] = useState(false);

  const editorRef = useRef(null);
  const markupEditorRef = useRef(null);


  function handleEditorChange(newEditorState) {
    const newMarkupState = stateToHTML(newEditorState.getCurrentContent());
    setEditorState(newEditorState);
    setMarkupState(newMarkupState);
  }

  function handleHTMLEditorChange(e) {
    const newMarkupState = e.target.value;
    const contentState = stateFromHTML(newMarkupState);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
    setMarkupState(newMarkupState);
  }

  /*
   * When value changes on a reset, set editor and markup state to value.
   */
  useEffect(
    () => {
      if (value !== markupState) {
        setEditorState(EditorState.createWithContent(stateFromHTML(value)));
        setMarkupState(value);
      }
    },
    [value],
  );

  /*
   * On blur update the useForm hook state.
   */
  const { name, onChange, onBlur } = props;
  function handleBlur() {
    onBlur(name, true); // Set touched to true
    onChange(name, markupState); // Set value to markup
  }

  function handleKeyCommand(command, newEditorState) {
    const newState = RichUtils.handleKeyCommand(newEditorState, command);
    if (newState) {
      handleEditorChange(newState);
      return true;
    }
    return false;
  }

  function mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e); /* eslint-disable-line consistent-return */
  }

  function toggleUndo() {
    const newEditorState = EditorState.undo(editorState);
    const newMarkupState = stateToHTML(newEditorState.getCurrentContent());
    setEditorState(newEditorState);
    setMarkupState(newMarkupState);
  }

  function toggleRedo() {
    const newEditorState = EditorState.redo(editorState);
    const newMarkupState = stateToHTML(newEditorState.getCurrentContent());
    setEditorState(newEditorState);
    setMarkupState(newMarkupState);
  }

  function toggleBlockType(blockType) {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleInlineStyle(inlineStyle) {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  function focusOnEditor() {
    editorRef.current.focus();
  }

  /*
   * When preview changes, set correct focus.
   */
  useEffect(
    () => {
      if (preview) {
        markupEditorRef.current.focus();
      } else {
        focusOnEditor();
      }
    },
    [preview],
  );

  function togglePreview() {
    setPreview(!preview);
  }


  const { placeholder } = props;

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.

  let editorClassName = `RichEditor-editor${preview ? ' noshow' : ''}`;
  const contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      editorClassName = `${editorClassName} RichEditor-hidePlaceholder`;
    }
  }

  return (
    <>
      <div className="RichEditor-root">
        <div className="RichEditor-controls">
          <StyleControls
            preview={preview}
            editorState={editorState}
            onTogglePreview={togglePreview}
            onToggleBlockType={toggleBlockType}
            onToggleInlineStyle={toggleInlineStyle}
            onToggleUndo={toggleUndo}
            onToggleRedo={toggleRedo}
          />
        </div>


        <div // eslint-disable-line
          className={editorClassName}
          onClick={focusOnEditor}
        >
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={handleEditorChange}
            onBlur={() => handleBlur('editor')}
            placeholder={placeholder}
            ref={editorRef}
            spellCheck
          />
        </div>


        <div className={`MarkupEditor-editor${!preview ? ' noshow' : ''}`}>
          <textarea
            type="textarea"
            // name={name}
            // id={`id-${name}`}
            placeholder="Editor source"
            // required={required}
            value={markupState}
            onChange={handleHTMLEditorChange}
            onBlur={() => handleBlur('markup')}
            ref={markupEditorRef}
            // invalid={hasError}
          />
        </div>


      </div>
    </>
  );
};

CustomFormInputTextAreaWYSIWYG.propTypes = propTypes;
CustomFormInputTextAreaWYSIWYG.defaultProps = defaultProps;

export default CustomFormInputTextAreaWYSIWYG;


/*
 * Style button.
 */
const StyleButton = (props) => {
  const {
    label, iconClass, active, preview, style, onToggle,
  } = props;

  function handleToggle(e) {
    e.preventDefault();
    if (!preview) {
      onToggle(style);
    }
  }

  let className = 'RichEditor-styleButton';
  if (preview) {
    className += ' RichEditor-disabledButton';
  } else if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    <span
      className={className}
      role="button"
      tabIndex={-1}
      onMouseDown={handleToggle}
    >
      <div className={`RichEditor-${iconClass}`}>
        {label}
      </div>
    </span>
  );
};

StyleButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  preview: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};


/*
 * Preview control.
 */
const PreviewControl = (props) => {
  const { control, preview, onTogglePreview } = props;

  return (
    <span
      className={`RichEditor-styleButton${preview ? ' RichEditor-activeButton' : ''}`}
      role="button"
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
        onTogglePreview();
      }}
    >
      <div className={`RichEditor-${control.iconClass}`}>
        {'>_'}
      </div>
    </span>
  );
};

PreviewControl.propTypes = {
  control: PropTypes.shape({
    type: PropTypes.oneOf(['PREVIEW']),
    id: PropTypes.string,
    label: PropTypes.string,
    iconClass: PropTypes.string,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
  onTogglePreview: PropTypes.func.isRequired,
};


/*
 * Block style control.
 */
const BlockStyleControl = (props) => {
  const {
    control, preview, editorState, onToggleBlockType,
  } = props;

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <StyleButton
      active={control.style === blockType}
      preview={preview}
      label={control.label}
      iconClass={control.iconClass}
      onToggle={onToggleBlockType}
      style={control.style}
    />
  );
};

BlockStyleControl.propTypes = {
  control: PropTypes.shape({
    type: PropTypes.oneOf(['BLOCK']),
    id: PropTypes.string,
    label: PropTypes.string,
    iconClass: PropTypes.string,
    style: PropTypes.string,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
  onToggleBlockType: PropTypes.func.isRequired,
};


/*
 * Inline style control.
 */
const InlineStyleControl = (props) => {
  const {
    control, preview, editorState, onToggleInlineStyle,
  } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <StyleButton
      active={currentStyle.has(control.style)}
      preview={preview}
      label={control.label}
      iconClass={control.iconClass}
      onToggle={onToggleInlineStyle}
      style={control.style}
    />
  );
};

InlineStyleControl.propTypes = {
  control: PropTypes.shape({
    type: PropTypes.oneOf(['INLINE']),
    id: PropTypes.string,
    label: PropTypes.string,
    iconClass: PropTypes.string,
    style: PropTypes.string,
  }).isRequired,
  preview: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
  onToggleInlineStyle: PropTypes.func.isRequired,
};

/*
 * Inline style control.
 */
const UndoRedoControl = (props) => {
  const {
    control, editorState, onToggleUndo, onToggleRedo,
  } = props;

  const disabled = control.id === 'undo'
    ? editorState.getUndoStack().count() === 0 : editorState.getRedoStack().count() === 0;

  return (
    <span
      className={`RichEditor-styleButton${disabled ? ' RichEditor-disabledButton' : ''}`}
      role="button"
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
        if (control.id === 'undo') {
          onToggleUndo();
        } else if (control.id === 'redo') {
          onToggleRedo();
        }
      }}
    >
      <div className={`RichEditor-${control.iconClass}`} />
    </span>
  );
};

UndoRedoControl.propTypes = {
  control: PropTypes.shape({
    type: PropTypes.oneOf(['UNDOREDO']),
    id: PropTypes.string,
    label: PropTypes.string,
    iconClass: PropTypes.string,
  }).isRequired,
  editorState: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
  onToggleUndo: PropTypes.func.isRequired,
  onToggleRedo: PropTypes.func.isRequired,
};


const CONTROLS = [
  {
    type: 'PREVIEW', id: 'preview', label: 'Preview', iconClass: 'previewIcon',
  },
  {
    type: 'BLOCK', id: 'h1', label: 'H1', style: 'header-one', iconClass: 'headingIcon',
  },
  {
    type: 'BLOCK', id: 'h2', label: 'H2', style: 'header-two', iconClass: 'headingIcon',
  },
  {
    type: 'BLOCK', id: 'h3', label: 'H3', style: 'header-three', iconClass: 'headingIcon',
  },
  {
    type: 'BLOCK', id: 'h4', label: 'H4', style: 'header-four', iconClass: 'headingIcon',
  },
  {
    type: 'INLINE', id: 'bold', label: 'B', style: 'BOLD', iconClass: 'boldIcon',
  },
  {
    type: 'INLINE', id: 'italic', label: 'I', style: 'ITALIC', iconClass: 'italicIcon',
  },
  {
    type: 'INLINE', id: 'underline', label: 'U', style: 'UNDERLINE', iconClass: 'underlineIcon',
  },
  {
    type: 'BLOCK', id: 'blocquote', label: '', style: 'blockquote', iconClass: 'blockquoteIcon',
  },
  {
    type: 'BLOCK', id: 'codeblock', label: '</>', style: 'code-block', iconClass: 'codeblockIcon',
  },
  {
    type: 'BLOCK', id: 'ul', label: '', style: 'unordered-list-item', iconClass: 'ulIcon',
  },
  {
    type: 'BLOCK', id: 'ol', label: '1.', style: 'ordered-list-item', iconClass: 'olIcon',
  },
  // { type: 'INLINE', id: 'monospace', label: 'Monospace', icon: [], style: 'CODE',
  // iconClass: 'monospaceIcon' },
  {
    type: 'UNDOREDO', id: 'undo', label: '', iconClass: 'undoIcon',
  },
  {
    type: 'UNDOREDO', id: 'redo', label: '', iconClass: 'redoIcon',
  },
];

const StyleControls = (props) => {
  const {
    preview, editorState, onTogglePreview, onToggleBlockType, onToggleInlineStyle, onToggleUndo,
    onToggleRedo,
  } = props;

  return (
    <>
      {CONTROLS.map((control) => (
        <React.Fragment key={control.id}>
          {control.type === 'PREVIEW' && (
            <PreviewControl
              control={control}
              preview={preview}
              onTogglePreview={onTogglePreview}
            />
          )}

          {control.type === 'BLOCK' && (
            <BlockStyleControl
              control={control}
              preview={preview}
              editorState={editorState}
              onToggleBlockType={onToggleBlockType}
            />
          )}

          {control.type === 'INLINE' && (
            <InlineStyleControl
              control={control}
              preview={preview}
              editorState={editorState}
              onToggleInlineStyle={onToggleInlineStyle}
            />
          )}

          {control.type === 'UNDOREDO' && (
            <UndoRedoControl
              control={control}
              preview={preview}
              editorState={editorState}
              onToggleUndo={onToggleUndo}
              onToggleRedo={onToggleRedo}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

StyleControls.propTypes = {
  preview: PropTypes.bool.isRequired,
  editorState: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
  onTogglePreview: PropTypes.func.isRequired,
  onToggleBlockType: PropTypes.func.isRequired,
  onToggleInlineStyle: PropTypes.func.isRequired,
  onToggleUndo: PropTypes.func.isRequired,
  onToggleRedo: PropTypes.func.isRequired,
};
