export interface UploadFile {
  uri: string;
  type: string;
  name: string;
}

export interface ImagePickerResult {
  cancelled: boolean;
  assets: {
    uri: string;
    type: string;
    fileName: string;
    width: number;
    height: number;
    fileSize: number;
  }[];
}

export interface ImageActionsProps {
  onTakePhoto: () => void;
  onSelectImage: () => void;
  onDeleteImage: () => void;
  onDownloadImage: () => void;
  image: string | null;
}

export interface ImagePreviewProps {
  image: string | null;
}


export interface BackendResponse {
  waste_type: string;
}

export interface AlertState {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
}

export interface ImageState {
  uri: string | null;
  type?: string;
  name?: string;
}