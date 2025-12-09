import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file received.' },
                { status: 400 }
            );
        }

        // Upload to Vercel Blob
        const blob = await put(file.name, file, {
            access: 'public',
        });

        return NextResponse.json({
            message: 'Success',
            filePath: blob.url  // Returning 'url' as 'filePath' to match frontend expectation
        });
    } catch (error) {
        console.error("Upload Error Details:", error);
        return NextResponse.json(
            { error: 'Error occurred while processing request.', details: String(error) },
            { status: 500 }
        );
    }
}
