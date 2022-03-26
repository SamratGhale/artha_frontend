import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 4,
  borderColor: '#000000',
  borderStyle: 'dashed',
  backgroundColor: '#ffffff',
  color: '#bdbdbd',
  transition: 'border .100s ease-in-out',
  width: '200px',
  height: '200px',
  borderRadius: '90%'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function UploadExcel({ handleImages, imageUploaded }) {
  const maxSize = 1048576;

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        handleImages(acceptedFiles);
      }
    },
    [handleImages]
  );

  const {
    isDragActive,
    isDragAccept,
    getRootProps,
    getInputProps,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    minSize: 0,
    maxSize: 3145728,
    multiple: false
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const isFileTooLarge =
    fileRejections &&
    fileRejections.length > 0 &&
    fileRejections[0].file.size > maxSize;
  return (
    <div className="container text-center ">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {!isDragActive && <p>Click here or drop your file here !</p>}
        {isDragReject && 'File type not accepted, sorry!'}
        {isFileTooLarge && (
          <div className="text-danger mt-2">File is too large.</div>
        )}
      </div>
    </div>
  );
}
