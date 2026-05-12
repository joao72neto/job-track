import { googleDriveApi, googleUploadApi } from "./api";

const FILE_NAME = "job-track-data.json";

export const googleDriveService = {
  /**
   * Finds the backup file in Google Drive.
   */
  async findBackupFile(token: string): Promise<string | null> {
    const response = await googleDriveApi.get("", {
      params: {
        q: `name='${FILE_NAME}' and trashed=false`,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  },

  /**
   * Downloads the content of a file from Google Drive.
   */
  async downloadFile(token: string, fileId: string): Promise<any> {
    const response = await googleDriveApi.get(`/${fileId}`, {
      params: {
        alt: "media",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  /**
   * Creates a new backup file or updates an existing one.
   */
  async uploadFile(token: string, data: any, fileId?: string): Promise<void> {
    if (fileId) {
      await googleUploadApi.patch(`/${fileId}`, data, {
        params: {
          uploadType: "media",
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } else {
      const metadata = {
        name: FILE_NAME,
        mimeType: "application/json",
      };

      const formData = new FormData();
      formData.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
      );
      formData.append(
        "file",
        new Blob([JSON.stringify(data)], { type: "application/json" }),
      );

      await googleUploadApi.post("", formData, {
        params: {
          uploadType: "multipart",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
};
