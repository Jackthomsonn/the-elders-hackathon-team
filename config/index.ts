const dev = process.env.NODE_ENV !== 'production';


export const config = {
    url: dev ? 'http://localhost:3000' : 'https://the-elders-hackathon-team.vercel.app/'
}