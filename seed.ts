import { db } from './src/lib/db';
import * as bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await db.user.upsert({
    where: { email: 'admin@jobportal.com' },
    update: {},
    create: {
      email: 'admin@jobportal.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      title: 'Portal Administrator',
      location: 'San Francisco, CA',
    },
  });

  // Create Sample Users
  const userPassword = await bcrypt.hash('user123', 10);
  
  const users = [];
  const sampleUsers = [
    { email: 'john@example.com', name: 'John Smith', title: 'Senior Developer', location: 'New York, NY', skills: 'React, Node.js, TypeScript', experience: '5 years', education: 'BS Computer Science' },
    { email: 'sarah@example.com', name: 'Sarah Johnson', title: 'UI/UX Designer', location: 'Austin, TX', skills: 'Figma, Adobe XD, CSS', experience: '3 years', education: 'BA Design' },
    { email: 'mike@example.com', name: 'Mike Chen', title: 'Data Scientist', location: 'Seattle, WA', skills: 'Python, ML, TensorFlow', experience: '4 years', education: 'MS Data Science' },
    { email: 'emily@example.com', name: 'Emily Davis', title: 'Product Manager', location: 'Boston, MA', skills: 'Agile, Strategy, Analytics', experience: '6 years', education: 'MBA' },
    { email: 'alex@example.com', name: 'Alex Wilson', title: 'DevOps Engineer', location: 'Denver, CO', skills: 'AWS, Docker, Kubernetes', experience: '3 years', education: 'BS Computer Engineering' },
  ];

  for (const u of sampleUsers) {
    const user = await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: userPassword,
        name: u.name,
        role: 'USER',
        title: u.title,
        location: u.location,
        skills: u.skills,
        experience: u.experience,
        education: u.education,
        bio: `Passionate ${u.title} with a track record of delivering exceptional results.`,
      },
    });
    users.push(user);
  }

  // Create Sample Jobs
  const sampleJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      description: 'We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using React.js and Next.js, ensuring high performance and responsiveness across all platforms.',
      requirements: '5+ years of experience with React.js, strong TypeScript skills, experience with state management (Redux/Zustand), familiarity with CI/CD pipelines, excellent communication skills.',
      experience: '5+ years',
      education: "Bachelor's in Computer Science or related field",
      skills: 'React, TypeScript, Next.js, Tailwind CSS, GraphQL',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignStudio Pro',
      location: 'Remote',
      type: 'Remote',
      salary: '$90,000 - $130,000',
      description: 'Join our creative team to design intuitive and visually stunning interfaces for our SaaS products. You will work closely with product managers and developers to create seamless user experiences.',
      requirements: '3+ years of product design experience, proficiency in Figma and Adobe Creative Suite, strong portfolio demonstrating UX process, understanding of accessibility standards.',
      experience: '3+ years',
      education: "Bachelor's in Design or related field",
      skills: 'Figma, Adobe XD, Sketch, User Research, Prototyping',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'Backend Engineer (Node.js)',
      company: 'CloudScale Systems',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130,000 - $170,000',
      description: 'We need a skilled Backend Engineer to design and implement scalable server-side solutions. You will work on our core API, database architecture, and cloud infrastructure.',
      requirements: '4+ years of Node.js experience, strong knowledge of PostgreSQL/MongoDB, experience with microservices architecture, understanding of RESTful API design, familiarity with AWS/GCP.',
      experience: '4+ years',
      education: "Bachelor's in Computer Science or equivalent",
      skills: 'Node.js, Express, PostgreSQL, MongoDB, AWS, Docker',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'Data Scientist',
      company: 'AI Analytics Co.',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$140,000 - $180,000',
      description: 'We are seeking a talented Data Scientist to help us build ML models and derive insights from our growing dataset. You will work on recommendation systems, NLP, and predictive analytics.',
      requirements: 'MS/PhD in Computer Science, Statistics, or related field, strong Python programming skills, experience with ML frameworks (TensorFlow/PyTorch), knowledge of statistical analysis methods.',
      experience: '3+ years',
      education: "Master's or PhD in relevant field",
      skills: 'Python, TensorFlow, PyTorch, SQL, Pandas, NumPy',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'DevOps Engineer',
      company: 'InfraCloud Ltd.',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$125,000 - $165,000',
      description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will ensure system reliability, scalability, and security across our platforms.',
      requirements: '3+ years of DevOps experience, strong knowledge of AWS/Azure/GCP, experience with Docker and Kubernetes, proficiency in Terraform/Ansible, understanding of monitoring tools.',
      experience: '3+ years',
      education: "Bachelor's in Computer Science or related",
      skills: 'AWS, Docker, Kubernetes, Terraform, CI/CD, Linux',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      description: 'We need an experienced Product Manager to drive the product vision and strategy for our flagship product. You will work cross-functionally with engineering, design, and marketing teams.',
      requirements: '5+ years of product management experience, strong analytical skills, experience with agile methodologies, excellent stakeholder management, technical background preferred.',
      experience: '5+ years',
      education: "Bachelor's degree required, MBA preferred",
      skills: 'Product Strategy, Agile, Analytics, Roadmapping, User Research',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'Mobile Developer (React Native)',
      company: 'AppWorks Studio',
      location: 'Remote',
      type: 'Remote',
      salary: '$100,000 - $140,000',
      description: 'Join our mobile team to build cross-platform applications using React Native. You will develop new features, optimize performance, and ensure a great user experience across iOS and Android.',
      requirements: '3+ years of React Native experience, strong JavaScript/TypeScript skills, experience with native modules, understanding of mobile UI/UX patterns, App Store deployment experience.',
      experience: '3+ years',
      education: "Bachelor's in Computer Science or related",
      skills: 'React Native, TypeScript, Redux, iOS, Android',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'Marketing Intern',
      company: 'GrowthHub',
      location: 'Denver, CO',
      type: 'Internship',
      salary: '$25 - $35/hr',
      description: 'We are offering a summer internship for aspiring marketers. You will assist with social media campaigns, content creation, and market research to support our growing brand.',
      requirements: 'Currently pursuing a degree in Marketing or related field, strong writing skills, familiarity with social media platforms, creative mindset, eager to learn.',
      experience: '0 - 1 years',
      education: 'Currently enrolled in a university program',
      skills: 'Social Media, Content Writing, SEO, Analytics',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'Full Stack Developer',
      company: 'WebDev Solutions',
      location: 'Chicago, IL',
      type: 'Contract',
      salary: '$85 - $120/hr',
      description: 'We are looking for a Full Stack Developer for a 6-month contract to help build a new client-facing application. You will work independently and as part of a distributed team.',
      requirements: '5+ years of full stack development experience, strong React and Node.js skills, experience with PostgreSQL and MongoDB, familiarity with cloud services, excellent problem-solving skills.',
      experience: '5+ years',
      education: "Bachelor's in Computer Science or equivalent experience",
      skills: 'React, Node.js, PostgreSQL, MongoDB, AWS, TypeScript',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
    {
      title: 'QA Engineer',
      company: 'QualityFirst Inc.',
      location: 'Miami, FL',
      type: 'Part-time',
      salary: '$60,000 - $80,000',
      description: 'We need a detail-oriented QA Engineer to ensure our products meet the highest quality standards. You will develop test plans, automate tests, and collaborate with developers.',
      requirements: '2+ years of QA testing experience, experience with Selenium/Cypress, knowledge of API testing, understanding of CI/CD pipelines, strong attention to detail.',
      experience: '2+ years',
      education: "Bachelor's in Computer Science or related",
      skills: 'Selenium, Cypress, API Testing, JIRA, SQL',
      status: 'ACTIVE',
      postedBy: admin.id,
    },
  ];

  const jobs = [];
  for (const j of sampleJobs) {
    const job = await db.job.create({ data: j });
    jobs.push(job);
  }

  // Create Sample Applications
  const applicationStatuses = ['PENDING', 'REVIEWED', 'SHORTLISTED', 'REJECTED', 'HIRED'];
  for (let i = 0; i < Math.min(users.length * 2, 10); i++) {
    const user = users[i % users.length];
    const job = jobs[i % jobs.length];
    try {
      await db.application.create({
        data: {
          jobId: job.id,
          userId: user.id,
          coverLetter: `I am very excited to apply for the ${job.title} position at ${job.company}. With my background in ${user.skills}, I believe I would be a great fit for this role. I am eager to contribute to your team and help drive success.`,
          status: applicationStatuses[i % applicationStatuses.length],
        },
      });
    } catch {
      // Skip duplicates
    }
  }

  console.log('Database seeded successfully!');
  console.log(`Created: 1 Admin, ${users.length} Users, ${jobs.length} Jobs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
