export function validateFileSize(file) {
  // console.log('~ file', file);
  if (file.size > 1024 * 1024) {
    alert('File yang ada upload melebihi ukuran 1MB.');
    return false;
  }
  return true;
}
