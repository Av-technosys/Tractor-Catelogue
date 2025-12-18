"use client";

type UploadedImage = {
    filePath: string;
    fileId: string;
};

export default function ImageUpload({
    onUploadSuccess,
}: {
    onUploadSuccess: (images: UploadedImage[]) => void;
}) {
    async function uploadImages(files: FileList) {
        const uploaded: UploadedImage[] = [];

        const authRes = await fetch("/api/imagekit-auth");
        const auth = await authRes.json();

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("folder", "products");
            formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
            formData.append("signature", auth.signature);
            formData.append("expire", auth.expire);
            formData.append("token", auth.token);

            const res = await fetch(
                "https://upload.imagekit.io/api/v1/files/upload",
                { method: "POST", body: formData }
            );

            const result = await res.json();

            uploaded.push({
                filePath: result.filePath.replace("/", ""),
                fileId: result.fileId,
            });
        }

        onUploadSuccess(uploaded);
    }

    return (
        <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
                e.target.files && uploadImages(e.target.files)
            }
        />
    );
}
