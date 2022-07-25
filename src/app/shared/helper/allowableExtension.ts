import { Injectable } from "@angular/core";
@Injectable()
export class AllowableExtensions {
  public allowableExtension = [
    { extension: 'jpg', type: 'image' },
    { extension: 'gif', type: 'image' },
    { extension: 'png', type: 'image' },
    { extension: 'jpeg', type: 'image' },
    { extension: 'JPG', type: 'image' },
    { extension: 'PNG', type: 'image' },
    { extension: 'GIF', type: 'image' },
    { extension: 'JPEG', type: 'image' },
    { extension: 'bmp', type: 'image' },
    { extension: '3gp', type: 'video' },
    { extension: 'mp4', type: 'video' },
    { extension: 'm4a', type: 'video' },
    { extension: 'aac', type: 'video' },
    { extension: 'mkv', type: 'video' },
    { extension: 'wav', type: 'video' },
    { extension: 'ogg', type: 'audio' },
    { extension: 'mp3', type: 'audio' },
    { extension: 'wav', type: 'audio' },
    { extension: 'wma', type: 'audio' },
    { extension: 'pdf', type: 'pdf' },
    { extension: 'PDF', type: 'pdf' },
    { extension: 'DOC', type: 'document' },
    { extension: 'doc', type: 'document' },
    { extension: 'docm', type: 'document' },
    { extension: 'docx', type: 'document' },
  ];

  public getExtensionType(extension) {
    const data = this.allowableExtension.find(Data => {
      return Data.extension === extension;
    });
    if (data) {
      return data.type;
    } else {
      return '';
    }
  }
}
