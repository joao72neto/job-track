const DRIVE_API_URL = "https://www.googleapis.com/drive/v3/files";
const UPLOAD_API_URL = "https://www.googleapis.com/upload/drive/v3/files";

const FILE_NAME = "job-track-data.json";

export const googleDriveService = {
  /**
   * Finds the backup file in Google Drive.
   */
  async findBackupFile(token: string): Promise<string | null> {
    const response = await fetch(
      `${DRIVE_API_URL}?q=name='${FILE_NAME}' and trashed=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  },

  /**
   * Downloads the content of a file from Google Drive.
   */
  async downloadFile(token: string, fileId: string): Promise<any> {
    const response = await fetch(`${DRIVE_API_URL}/${fileId}?alt=media`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao baixar arquivo do Drive");
    return await response.json();
  },

  /**
   * Creates a new backup file or updates an existing one.
   */
  async uploadFile(token: string, data: any, fileId?: string): Promise<void> {
    if (fileId) {
      const response = await fetch(
        `${UPLOAD_API_URL}/${fileId}?uploadType=media`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) throw new Error("Erro ao atualizar arquivo no Drive");
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

      const response = await fetch(`${UPLOAD_API_URL}?uploadType=multipart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao criar arquivo no Drive");
    }
  },
};
