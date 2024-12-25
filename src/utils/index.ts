import crypto from 'crypto';

// Secret key and initialization vector (IV)
const secretKey = process.env.NEXT_PUBLIC_HASH_SECRET || crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);       // 128-bit IV

// Encrypt function
export const encryptData = (data: any): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt function
export const decryptData = (encryptedData: string): any => {
    const [ivHex, encryptedHex] = encryptedData.split(':');
    const ivBuffer = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, ivBuffer);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
