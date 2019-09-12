/** 
 * @author Nitesh Sharma 
 */
import { isNullOrUndefined } from 'util';

/**
 * Required file type
 * @param fileTypes 
 * @returns  
 */
export function requiredFileType(fileTypes: string[]): any {
  return (control: any): any => {
    const file: any = control.value;
    if (file && file.name) {
      const extension: any = file.name.split('.')[1].toLowerCase();
      const checkFileExist: any = fileTypes.find((rc: string) => rc.toLowerCase() === extension.toLowerCase())
      if (isNullOrUndefined(checkFileExist)) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}

// pass maxSize value in KB
/**
 * Validates file size
 * @param maxSize 
 * @returns file size 
 */
export function validateFileSize(maxSize: number): { [key: string]: any } {
  return (c: any): any => {
    if (c.value == null || c.value.length === 0) {
      return { required: true };
    }
    return maxSize && c.value.size / 1024 > maxSize ? { maxFileSize: true } : null;
  }
}