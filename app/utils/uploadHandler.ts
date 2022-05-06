// eslint-disable-next-line camelcase
import { unstable_createFileUploadHandler } from 'remix';

export const uploadHandler = unstable_createFileUploadHandler({
    directory: './media',
    maxFileSize: 20 * 1024 * 1024
});
