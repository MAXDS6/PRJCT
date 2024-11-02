// app/api/users/route.js
import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const users = JSON.parse(fileContents);
        
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error reading users.json:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
