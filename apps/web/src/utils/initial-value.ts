import type { IResume } from '@vitaes/types/resume'

export const initialValue: IResume = {
  config: {
    themeColor: 'awesome-red',
    headerAlign: 'center',
    sectionColorHighlight: true,
    fontSize: 9,
    pageSize: 'A4',
  },

  personalInfo: {
    firstName: 'Byungjin',
    lastName: 'Park',
    photo: {
      url: 'https://github.com/diegopluna.png',
    },
    position: 'Software Architect · Security Expert',
    address: '42-8, Bangbae-ro 15-gil, Seocho-gu, Seoul, 00681, Rep. of KOREA',
    socials: [
      {
        id: 'mobile-1',
        platform: 'mobile',
        value: '(+82) 10-9030-1843',
      },
      {
        id: 'email-1',
        platform: 'email',
        value: 'posquit0.bj@gmail.com',
      },
      {
        id: 'homepage-1',
        platform: 'homepage',
        value: 'www.posquit0.com',
      },
      {
        id: 'github-1',
        platform: 'github',
        value: 'posquit0',
      },
      {
        id: 'linkedin-1',
        platform: 'linkedin',
        value: 'posquit0',
      },
    ],
    quote: '"Be the change that you want to see in the world."',
  },

  sections: [
    {
      id: 'summary-1',
      title: 'Summary',
      type: 'text',
      content:
        'Current Site Reliability Engineer at start-up company Kasa. 7+ years experience specializing in the backend development, infrastructure automation, and computer hacking/security. Super nerd who loves Vim, Linux and OS X and enjoys to customize all of the development environment. Interested in devising a better problem-solving method for challenging tasks, and learning new technologies and tools if the need arises.',
    },
    {
      id: 'experience-1',
      title: 'Work Experience',
      type: 'timeline',
      entries: [
        {
          id: 'exp-1',
          position: 'Software Architect',
          title: 'Omnious. Co., Ltd.',
          location: 'Seoul, S.Korea',
          date: 'Jun. 2017 - May. 2018',
          items: [
            'Provisioned an easily managable hybrid infrastructure(Amazon AWS + On-premise) utilizing IaC(Infrastructure as Code) tools like Ansible, Packer and Terraform.',
            'Built fully automated CI/CD pipelines on CircleCI for containerized applications using Docker, AWS ECR and Rancher.',
            'Designed an overall service architecture and pipelines of the Machine Learning based Fashion Tagging API SaaS product with the micro-services architecture.',
            'Implemented several API microservices in Node.js Koa and in the serverless AWS Lambda functions.',
            'Deployed a centralized logging environment(ELK, Filebeat, CloudWatch, S3) which gather log data from docker containers and AWS resources.',
            'Deployed a centralized monitoring environment(Grafana, InfluxDB, CollectD) which gather system metrics as well as docker run-time metrics.',
          ],
        },
        {
          id: 'exp-2',
          position: 'Co-founder & Software Engineer',
          title: 'PLAT Corp.',
          location: 'Seoul, S.Korea',
          date: 'Jan. 2016 - Jun. 2017',
          items: [
            'Implemented RESTful API server for car rental booking application(CARPLAT in Google Play).',
            'Built and deployed overall service infrastructure utilizing Docker container, CircleCI, and several AWS stack(Including EC2, ECS, Route 53, S3, CloudFront, RDS, ElastiCache, IAM), focusing on high-availability, fault tolerance, and auto-scaling.',
            'Developed an easy-to-use Payment module which connects to major PG(Payment Gateway) companies in Korea.',
          ],
        },
        {
          id: 'exp-3',
          position:
            'Software Engineer & Security Researcher (Compulsory Military Service)',
          title: 'R.O.K Cyber Command, MND',
          location: 'Seoul, S.Korea',
          date: 'Aug. 2014 - Apr. 2016',
          items: [
            "Lead engineer on agent-less backtracking system that can discover client device's fingerprint(including public and private IP) independently of the Proxy, VPN and NAT.",
            'Implemented a distributed web stress test tool with high anonymity.',
            'Implemented a military cooperation system which is web based real time messenger in Scala on Lift.',
          ],
        },
        {
          id: 'exp-4',
          position: 'Game Developer Intern at Global Internship Program',
          title: 'NEXON',
          location: 'Seoul, S.Korea & LA, U.S.A',
          date: 'Jan. 2013 - Feb. 2013',
          items: [
            'Developed in Cocos2d-x an action puzzle game(Dragon Buster) targeting U.S. market.',
            'Implemented API server which is communicating with game client and In-App Store, along with two other team members who wrote the game logic and designed game graphics.',
            'Won the 2nd prize in final evaluation.',
          ],
        },
        {
          id: 'exp-5',
          position: 'Software Engineer',
          title: 'ShitOne Corp.',
          location: 'Seoul, S.Korea',
          date: 'Dec. 2011 - Feb. 2012',
          items: [
            'Developed a proxy drive smartphone application which connects proxy driver and customer.',
            'Implemented overall Android application logic and wrote API server for community service, along with lead engineer who designed bidding protocol on raw socket and implemented API server for bidding.',
          ],
        },
        {
          id: 'exp-6',
          position: 'Freelance Penetration Tester',
          title: 'SAMSUNG Electronics',
          location: 'S.Korea',
          date: 'Sep. 2013, Mar. 2011 - Oct. 2011',
          items: [
            'Conducted penetration testing on SAMSUNG KNOX, which is solution for enterprise mobile security.',
            'Conducted penetration testing on SAMSUNG Smart TV.',
          ],
        },
      ],
    },
    {
      id: 'honors-1',
      title: 'Honors & Awards',
      type: 'list',
      structure: {
        type: 'grouped',
        subsections: [
          {
            id: 'honors-int-1',
            title: 'International',
            items: [
              {
                id: 'honor-1',
                date: '2018',
                position: 'Finalist',
                title: 'DEFCON 26th CTF Hacking Competition World Final',
                location: 'Las Vegas, U.S.A',
              },
              {
                id: 'honor-2',
                date: '2017',
                position: 'Finalist',
                title: 'DEFCON 25th CTF Hacking Competition World Final',
                location: 'Las Vegas, U.S.A',
              },
              {
                id: 'honor-3',
                date: '2014',
                position: 'Finalist',
                title: 'DEFCON 22nd CTF Hacking Competition World Final',
                location: 'Las Vegas, U.S.A',
              },
              {
                id: 'honor-4',
                date: '2013',
                position: 'Finalist',
                title: 'DEFCON 21st CTF Hacking Competition World Final',
                location: 'Las Vegas, U.S.A',
              },
              {
                id: 'honor-5',
                date: '2011',
                position: 'Finalist',
                title: 'DEFCON 19th CTF Hacking Competition World Final',
                location: 'Las Vegas, U.S.A',
              },
            ],
          },
          {
            id: 'honors-dom-1',
            title: 'Domestic',
            items: [
              {
                id: 'honor-6',
                date: '2015',
                position: '3rd Place',
                title: 'WITHCON Hacking Competition Final',
                location: 'Seoul, S.Korea',
              },
              {
                id: 'honor-7',
                date: '2017',
                position: 'Silver Prize',
                title: 'KISA HDCON Hacking Competition Final',
                location: 'Seoul, S.Korea',
              },
              {
                id: 'honor-8',
                date: '2013',
                position: 'Silver Prize',
                title: 'KISA HDCON Hacking Competition Final',
                location: 'Seoul, S.Korea',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'presentation-1',
      title: 'Presentation',
      type: 'timeline',
      entries: [
        {
          id: 'pres-1',
          position:
            'Presenter for <Hosting Web Application for Free utilizing GitHub, Netlify and CloudFlare>',
          title: 'DevFest Seoul by Google Developer Group Korea',
          location: 'Seoul, S.Korea',
          date: 'Nov. 2017',
          items: [
            'Introduced the history of web technology and the JAM stack which is for the modern web application development.',
            'Introduced how to freely host the web application with high performance utilizing global CDN services.',
          ],
        },
        {
          id: 'pres-2',
          position: 'Presenter for <DEFCON 20th : The way to go to Las Vegas>',
          title: '6th CodeEngn (Reverse Engineering Conference)',
          location: 'Seoul, S.Korea',
          date: 'Jul. 2012',
          items: [
            'Introduced CTF(Capture the Flag) hacking competition and advanced techniques and strategy for CTF',
          ],
        },
      ],
    },
    {
      id: 'writing-1',
      title: 'Writing',
      type: 'timeline',
      entries: [
        {
          id: 'writ-1',
          position: 'Founder & Writer',
          title: 'A Guide for Developers in Start-up',
          location: 'Facebook Page',
          date: 'Jan. 2015 - PRESENT',
          items: [
            'Drafted daily news for developers in Korea about IT technologies, issues about start-up.',
          ],
        },
      ],
    },
    {
      id: 'committees-1',
      title: 'Program Committees',
      type: 'list',
      structure: {
        type: 'flat',
        items: [
          {
            id: 'comm-1',
            date: '2016',
            position: 'Problem Writer',
            title: '2016 CODEGATE Hacking Competition World Final',
            location: 'S.Korea',
          },
          {
            id: 'comm-2',
            date: '2013',
            position: 'Organizer & Co-director',
            title: '1st POSTECH Hackathon',
            location: 'S.Korea',
          },
        ],
      },
    },
    {
      id: 'extracurricular-1',
      title: 'Extracurricular Activity',
      type: 'timeline',
      entries: [
        {
          id: 'extra-1',
          position: 'Core Member & President at 2013',
          title: "PoApper (Developers' Network of POSTECH)",
          location: 'Pohang, S.Korea',
          date: 'Jun. 2010 - Jun. 2017',
          items: [
            'Reformed the society focusing on software engineering and building network on and off campus.',
            'Proposed various marketing and network activities to raise awareness.',
          ],
        },
        {
          id: 'extra-2',
          position: 'Member',
          title: 'PLUS (Laboratory for UNIX Security in POSTECH)',
          location: 'Pohang, S.Korea',
          date: 'Sep. 2010 - Oct. 2011',
          items: [
            'Gained expertise in hacking & security areas, especially about internal of operating system based on UNIX and several exploit techniques.',
            'Participated on several hacking competition and won a good award.',
            'Conducted periodic security checks on overall IT system as a member of POSTECH CERT.',
            'Conducted penetration testing commissioned by national agency and corporation.',
          ],
        },
      ],
    },
    {
      id: 'education-1',
      title: 'Education',
      type: 'timeline',
      entries: [
        {
          id: 'edu-1',
          position: 'B.S. in Computer Science and Engineering',
          title: 'POSTECH(Pohang University of Science and Technology)',
          location: 'Pohang, S.Korea',
          date: 'Mar. 2010 - Aug. 2017',
          items: [
            'Got a Chun Shin-Il Scholarship which is given to promising students in CSE Dept.',
          ],
        },
      ],
    },
  ],
}
