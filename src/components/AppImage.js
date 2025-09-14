import Image from 'next/image';

export default function AppImage({
    src,
    alt,
    fill = true,
    objectFit = 'cover',
    objectPosition = 'center',
    placeholder = 'blur',
    blurDataURL = '/placeholder.png',
    loading = 'lazy',
    width,
    height,
    className,
    ...props
}) {
    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            style={{ objectFit, objectPosition }}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            loading={loading}
            className={className}
            {...props}
        />
    );
}
