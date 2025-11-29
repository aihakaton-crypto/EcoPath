import { db } from '@/db';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';

async function main() {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));
    const oneAndHalfMonthsAgo = new Date(now.getTime() - (45 * 24 * 60 * 60 * 1000));
    const oneMonthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    const sampleUsers = [
        {
            email: 'emil@ecopath.az',
            username: 'Emil Mədətov',
            passwordHash: bcrypt.hashSync('password123', 10),
            points: 250,
            createdAt: twoMonthsAgo.toISOString(),
        },
        {
            email: 'nurlan@ecopath.az',
            username: 'Nurlan',
            passwordHash: bcrypt.hashSync('password123', 10),
            points: 180,
            createdAt: oneAndHalfMonthsAgo.toISOString(),
        },
        {
            email: 'omer@ecopath.az',
            username: 'Ömər Gədirli',
            passwordHash: bcrypt.hashSync('password123', 10),
            points: 320,
            createdAt: oneMonthAgo.toISOString(),
        }
    ];

    await db.insert(users).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});