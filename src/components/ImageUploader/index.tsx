'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { Button } from '../Button';
import { CopyIcon, EyeIcon, ImageUpIcon } from 'lucide-react';
import { toastifyAdapter } from '@/lib/adapters/toastAdapter';
import { IMAGE_UPLOADER_MAX_SIZE } from '@/lib/constants';
import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { PreviewImage } from '../DialogPreview';
import { usePathname } from 'next/navigation';

type UploaderImageProps = {
  isSending: boolean;
}

export function UploaderImage({ isSending }: UploaderImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');
  const [isCopy, setIsCopy] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const handleChoosenFile = () => {
    toastifyAdapter.dismiss();

    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    fileInputRef.current.click();
  };

  const handleChange = () => {
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file?.size > IMAGE_UPLOADER_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOADER_MAX_SIZE / 1024;
      toastifyAdapter.error(`Imagem muito grande. Max.: ${readableMaxSize}KB`);
      fileInput.value = '';
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const { url, error } = await uploadImageAction(formData);

      if (error) {
        toastifyAdapter.error(`Error: ${error}`);
        fileInput.value = '';
        setImgUrl('');
        return;
      }

      // TODO: Continuar depois
      setImgUrl(url);
    });

    toastifyAdapter.sucess('Imagem enviada');
    fileInput.value = '';
  };

  useEffect(() => {
    (async () => {
      if (isCopy && imgUrl) {
        toastifyAdapter.dismiss();
        try {
          await navigator.clipboard.writeText(imgUrl);
          toastifyAdapter.sucess(`URL copiada com suceso!`);
        } catch {
          toastifyAdapter.error('Erro ao copiar URL');
        }
        setImgUrl('');
        setIsCopy(!isCopy);
      }
    })();
  }, [imgUrl, isCopy]);

  useEffect(() => {
    setImgUrl('');
  }, [pathname]);

  return (
    <>
      <div className='flex gap-4'>
        <Button
          type='button'
          onClick={handleChoosenFile}
          disabled={isUploading || isSending}
        >
          <ImageUpIcon />
          Enviar Imagem
        </Button>

        {imgUrl && (
          <>
            <Button
              className='self-end self-justify'
              variant='ghost'
              type='button'
              onClick={() => setIsCopy(!isCopy)}
            >
              <CopyIcon />
              Copiar
            </Button>
            <Button
              className='self-end self-justify'
              variant='ghost'
              type='button'
              onClick={() => setIsVisible(!isVisible)}
            >
              <EyeIcon />
              Preview
            </Button>
          </>
        )}
      </div>
      <input
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleChange}
        disabled={isUploading || isSending}
      />

      {isVisible && (
        <PreviewImage
          className='rounded-lg'
          src={imgUrl}
          isVisible={isVisible}
          onCancel={() => setIsVisible(!isVisible)}
        />
      )}
    </>
  );
}
