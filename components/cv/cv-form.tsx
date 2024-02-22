"use client"

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CVExperienceProps, CVHeaderProps, CVProps, CVHonorTypeProps, CVPresentationProps, CVWritingProps, CVComitteeProps, CVEducationProps } from "@/types/cv-types";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import CV from "@/components/cv/cv";
import DisplayFrame from "@/components/display-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, Languages, Loader2, Medal, NotebookPen, Pen, PencilRuler, Presentation, ScrollText, UserRound, UsersRound, PlusCircle, MinusCircle, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";



export default function CVForm() {
    const [alignment, setAlignment] = React.useState('center')
    const [firstName, setFirstName] = React.useState('John')
    const [lastName, setLastName] = React.useState('Doe')
    const [phoneEnabled, setPhoneEnabled] = React.useState(true)
    const [phone, setPhone] = React.useState('123-456-7890')
    const [emailEnabled, setEmailEnabled] = React.useState(true)
    const [email, setEmail] = React.useState('john.doe@example.com')
    const [homepageEnabled, setHomepageEnabled] = React.useState(true)
    const [homepage, setHomepage] = React.useState('www.johndoe.com')
    const [githubEnabled, setGithubEnabled] = React.useState(true)
    const [github, setGithub] = React.useState('johndoe')
    const [linkedinEnabled, setLinkedinEnabled] = React.useState(true)
    const [linkedin, setLinkedin] = React.useState('johndoe')
    const [gitlabEnabled, setGitlabEnabled] = React.useState(false)
    const [gitlab, setGitlab] = React.useState('')
    const [twitterEnabled, setTwitterEnabled] = React.useState(false)
    const [twitter, setTwitter] = React.useState('')
    const [quoteEnabled, setQuoteEnabled] = React.useState(true)
    const [quote, setQuote] = React.useState('Experienced Software Engineer passionate about solving real-world problems.')
    const [ summaryEnabled, setSummaryEnabled ] = React.useState(true)
    const [ summaryLabel, setSummaryLabel ] = React.useState('Summary')
    const [ summaryContent, setSummaryContent ] = React.useState('Experienced software engineer with expertise in web development and a strong background in backend technologies. Proficient in JavaScript, Node.js, and React.')
    const [ experienceEnabled, setExperienceEnabled ] = React.useState(true)
    const [ experienceLabel, setExperienceLabel ] = React.useState('Work Experience')
    const [ experiences, setExperiences ] = React.useState([
        {
            company: 'ABC Corp',
            location: 'New York, NY',
            position: 'Senior Software Engineer',
            startDate: 'May.2018',
            endDate: 'Dec.2022',
            description: [
                "Led a team of developers in the design and implementation of a scalable web application.",
                "Developed RESTful APIs using Node.js and Express.",
                "Collaborated with cross-functional teams to deliver high-quality software solutions."
            ]
        },
        {
            company: 'XYZ Tech',
            location: 'San Francisco, CA',
            position: 'Software Engineer',
            startDate: 'Sep.2015',
            endDate: 'Apr.2018',
            description: [
                "Contributed to the development of a cutting-edge machine learning platform.",
                "Designed and implemented frontend components using React.",
                "Optimized application performance through code refactoring and performance profiling."
            ]
        }
    ] as CVExperienceProps[])
    const [ honorsEnabled, setHonorsEnabled ] = React.useState(true)
    const [ honorsLabel, setHonorsLabel ] = React.useState('Honors & Awards')
    const [ honorsTypes, setHonorsTypes ] = React.useState([
        {
            label: 'International',
            honors: [
                {
                    year: '2018',
                    position: 'Finalist',
                    honor: 'DEFCON 26th CTF Hacking Competition World Final',
                    location: 'Las Vegas, U.S.A.'
                },
                {
                    year: '2017',
                    position: 'Finalist',
                    honor: 'DEFCON 25th CTF Hacking Competition World Final',
                    location: 'Las Vegas, U.S.A.'
                },
                {
                    year: '2016',
                    position: 'Finalist',
                    honor: 'DEFCON 24th CTF Hacking Competition World Final',
                    location: 'Las Vegas, U.S.A.'
                }
            ]
        },
        {
            label: 'Domestic',
            honors: [
                {
                    year: '2015',
                    position: '3rd Place',
                    honor: 'WITHCON Hacking Competition Final',
                    location: 'Seoul, S.Korea'
                },
                {
                    year: '2017',
                    position: 'Silver Prize',
                    honor: 'KISA HDCON Hacking Competition Final',
                    location: 'Seoul, S.Korea'
                },
                {
                    year: '2013',
                    position: 'Silver Prize',
                    honor: 'KISA HDCON Hacking Competition Final',
                    location: 'Seoul, S.Korea'
                }
            ]
        }
    ] as CVHonorTypeProps[])
    const [ presentationsEnabled, setPresentationsEnabled ] = React.useState(true)
    const [ presentationsLabel, setPresentationsLabel ] = React.useState('Presentation')
    const [ presentations, setPresentations ] = React.useState([
        {
            event: "Tech Conference 2021",
            role: "Speaker",
            location: "New York, NY",
            date: "May.2021",
            description: [
                "Presented a talk on the latest trends in web development.",
                "Discussed the challenges and opportunities in modern web development."
            ]
        }
    ] as CVPresentationProps[])
    const [ writingEnabled, setWritingEnabled ] = React.useState(true)
    const [ writingLabel, setWritingLabel ] = React.useState('Writing')
    const [ writings, setWritings ] = React.useState([
        {
            title: "Exploring the World of Machine Learning",
            role: "Author",
            medium: "Journal",
            startDate: "Jan.2022",
            endDate: "Dec.2022",
            descriptions: [
                "Published a series of articles on the fundamentals of machine learning.",
                "Covered topics such as supervised learning, unsupervised learning, and reinforcement learning."
            ]
        },
        {
            title: "The Future of Web Development",
            role: "Co-author",
            medium: "Blog",
            startDate: "May.2023",
            endDate: "Dec.2023",
            descriptions: [
                "Co-authored a blog post on the future of web development.",
                "Discussed the latest trends in web development and the impact of emerging technologies."
            ]
        }
    ] as CVWritingProps[])
    const [ committeeEnabled, setCommitteeEnabled ] = React.useState(true)
    const [ committeeLabel, setCommitteeLabel ] = React.useState('Program Committees')
    const [ committees, setCommittees] = React.useState([
        {
            year: "2016",
            position: "Problem Writer",
            organization: "2016 CODEGATE Hacking Competition World Final ",
            location: "S.Korea"
        },
        {
            year: "2013",
            position: "Organizer & Co-director",
            organization: "1st POSTECH Hackathon",
            location: "S.Korea"
        }
    ] as CVComitteeProps[])
    const [ educationEnabled, setEducationEnabled ] = React.useState(true)
    const [ educationLabel, setEducationLabel ] = React.useState('Education')
    const [ educations, setEducations ] = React.useState([
        {
            school: "Stanford University",
            location: "Palo Alto, CA",
            degree: "Master of Science in Computer Science",
            startDate: "Sep.2013",
            endDate: "Jun.2015",
            description: [
                "Thesis: 'Deep Learning for Sentiment Analysis'",
                "GPA: 3.9/4.0"
            ]
        },
        {
            school: "POSTECH",
            location: "Pohang, S.Korea",
            degree: "Bachelor of Science in Computer Science",
            startDate: "Mar.2009",
            endDate: "Feb.2013",
            description: [
                "GPA: 3.8/4.0"
            ]
        }
    ] as CVEducationProps[])
    const [ extracurricularEnabled, setExtracurricularEnabled ] = React.useState(true)
    const [ extracurricularLabel, setExtracurricularLabel ] = React.useState('Extracurricular Activities')
    const [ extracurriculars, setExtracurriculars ] = React.useState([
        {
            role: "Core Member & President at 2013",
            organization: "PoApper (Developers' Network of POSTECH)",
            location: "Pohang, S.Korea",
            startDate: "Jun. 2010",
            endDate: "Jun. 2017",
            description: [
                "Reformed the society focusing on software engineering and building network on and off campus.",
                "Proposed various marketing and network activities to raise awareness."
            ]
        },
        {
            role: "Member",
            organization: "PLUS (Laboratory for UNIX Security in POSTECH)",
            location: "Pohang, S.Korea",
            startDate: "Sep. 2010",
            endDate: "Oct. 2011",
            description: [
                "Gained expertise in hacking & security areas, especially about internal of operating system based on UNIX and several exploit techniques.",
                "Participated on several hacking competition and won a good award.",
                "Conducted periodic security checks on overall IT system as a member of POSTECH CERT.",
                "Conducted penetration testing commissioned by national agency and corporation."
            ]
        }
    ])
    const [ loading, setLoading ] = React.useState(false)

    
    const cvProps: CVProps = {
        header: {
            alignment: alignment as CVHeaderProps['alignment'],
            firstName,
            lastName,
            phoneEnabled,
            phone,
            emailEnabled,
            email,
            homepageEnabled,
            homepage,
            githubEnabled,
            github,
            linkedinEnabled,
            linkedin,
            gitlabEnabled,
            gitlab,
            twitterEnabled,
            twitter,
            quoteEnabled,
            quote
        },
        summaryEnabled,
        summary: {
            label: summaryLabel,
            content: summaryContent
        },
        experienceEnabled,
        experience: {
            label: experienceLabel,
            experiences: experiences
        },
        honorsEnabled,
        honors: {
            label: honorsLabel,
            honors: honorsTypes
        },
        presentationsEnabled,
        presentations: {
            label: presentationsLabel,
            presentations
        },
        writingEnabled,
        writings: {
            label: writingLabel,
            writings
        },
        committeeEnabled,
        committees: {
            label: committeeLabel,
            committees
        },
        educationEnabled,
        educations: {
            label: educationLabel,
            educations
        },
        extracurricularEnabled,
        extracurriculars: {
            label: extracurricularLabel,
            extracurriculars
        }
    }

    const downloadCV = async() => {
        setLoading(true)
        const response = await fetch('/api/pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cvProps)
        })
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${firstName}-EasyCV.pdf`
        a.click()
        window.URL.revokeObjectURL(url)
        setLoading(false)
    }

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-w-[1000px] w-full rounded-lg border"
        >
            <ResizablePanel 
                className="min-w-[400px]"
                defaultSize={50}
            >
                <div className="flex h-full items-start justify-center p-6">
                    <Tabs defaultValue="personal" className="w-full">
                        <TabsList className="grid w-full grid-cols-11">
                            <TooltipProvider>
                                <TabsTrigger value="personal">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <UserRound />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Personal Info & Settings</p>
                                        </TooltipContent>
                                    </Tooltip>                   
                                </TabsTrigger>
                                <TabsTrigger value="summary">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ScrollText />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Summary</p>
                                        </TooltipContent>
                                    </Tooltip>                         
                                </TabsTrigger>
                                <TabsTrigger value="experience">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Briefcase />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Work Experience</p>
                                        </TooltipContent>
                                    </Tooltip>                                 
                                </TabsTrigger>
                                <TabsTrigger value="honors">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Medal />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Honors & Awards</p>
                                        </TooltipContent>
                                    </Tooltip> 
                                </TabsTrigger>
                                <TabsTrigger value="presentation">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Presentation />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Presentations</p>
                                        </TooltipContent>
                                    </Tooltip>                      
                                </TabsTrigger>
                                <TabsTrigger value="writing">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Pen />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Writings</p>
                                        </TooltipContent>
                                    </Tooltip>                            
                                </TabsTrigger>
                                <TabsTrigger value="committee">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <UsersRound />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Committees</p>
                                        </TooltipContent>
                                    </Tooltip>                      
                                </TabsTrigger>
                                <TabsTrigger value="education">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <GraduationCap />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Education</p>
                                        </TooltipContent>
                                    </Tooltip>                         
                                </TabsTrigger>
                                <TabsTrigger value="extracurricular">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <NotebookPen />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Extracurricular Activities</p>
                                        </TooltipContent>
                                    </Tooltip>             
                                </TabsTrigger>
                                <TabsTrigger value="projects">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <PencilRuler />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Projects</p>
                                        </TooltipContent>
                                    </Tooltip>                    
                                </TabsTrigger>
                                <TabsTrigger value="languages">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Languages />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Languages</p>
                                        </TooltipContent>
                                    </Tooltip>                             
                                </TabsTrigger>
                            </TooltipProvider>                            
                        </TabsList>
                        <TabsContent value="personal">
                            <Card>
                                <CardHeader>Personal Info & Settings</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="alignment">Alignment</Label>
                                        <Select value={alignment} onValueChange={setAlignment}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the header alignment" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="start">Left</SelectItem>
                                                    <SelectItem value="center">Center</SelectItem>
                                                    <SelectItem value="end">Right</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Switch checked={phoneEnabled} onCheckedChange={setPhoneEnabled} />
                                        </div>
                                        {phoneEnabled && (
                                            <Input placeholder="Phone" id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="email">Email</Label>
                                            <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                                        </div>
                                        {emailEnabled && (
                                            <Input placeholder="Email" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="homepage">Homepage</Label>
                                            <Switch checked={homepageEnabled} onCheckedChange={setHomepageEnabled} />
                                        </div>
                                        {homepageEnabled && (
                                            <Input placeholder="Homepage" id="homepage" type="text" value={homepage} onChange={(e) => setHomepage(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="github">Github</Label>
                                            <Switch checked={githubEnabled} onCheckedChange={setGithubEnabled} />
                                        </div>
                                        {githubEnabled && (
                                            <Input placeholder="Github" id="github" type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="linkedin">Linkedin</Label>
                                            <Switch checked={linkedinEnabled} onCheckedChange={setLinkedinEnabled} />
                                        </div>
                                        {linkedinEnabled && (
                                            <Input placeholder="Linkedin" id="linkedin" type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="gitlab">Gitlab</Label>
                                            <Switch checked={gitlabEnabled} onCheckedChange={setGitlabEnabled} />
                                        </div>
                                        {gitlabEnabled && (
                                            <Input placeholder="Gitlab" id="gitlab" type="text" value={gitlab} onChange={(e) => setGitlab(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="twitter">Twitter</Label>
                                            <Switch checked={twitterEnabled} onCheckedChange={setTwitterEnabled} />
                                        </div>
                                        {twitterEnabled && (
                                            <Input placeholder="Twitter" id="twitter" type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="quote">Quote</Label>
                                            <Switch checked={quoteEnabled} onCheckedChange={setQuoteEnabled} />
                                        </div>
                                        {quoteEnabled && (
                                            <Input placeholder="Quote" id="quote" type="text" value={quote} onChange={(e) => setQuote(e.target.value)} />
                                        )}
                                    </div>

                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="summary">
                            <Card>
                                <CardHeader>
                                    Summary
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="summaryEnabled">Enabled</Label>
                                            <Switch checked={summaryEnabled} onCheckedChange={setSummaryEnabled} />
                                        </div>
                                        {summaryEnabled && (
                                            <div className="space-y-1">
                                                <Label htmlFor="summaryLabel">Label</Label>
                                                <Input id="summaryLabel" type="text" value={summaryLabel} onChange={(e) => setSummaryLabel(e.target.value)} />
                                                <Label htmlFor="summaryContent">Content</Label>
                                                <Textarea id="summaryContent" value={summaryContent} onChange={(e) => setSummaryContent(e.target.value)} />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="experience">
                            <Card>
                                <CardHeader>Experience</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="experienceEnabled">Enabled</Label>
                                            <Switch checked={experienceEnabled} onCheckedChange={setExperienceEnabled} />
                                        </div>                               
                                        {experienceEnabled && (
                                            <div className="space-y-2">
                                                <Label htmlFor="experienceLabel">Label</Label>
                                                <Input id="experienceLabel" type="text" value={experienceLabel} onChange={(e) => setExperienceLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setExperiences([...experiences, {
                                                            company: '',
                                                            location: '',
                                                            position: '',
                                                            startDate: '',
                                                            endDate: '',
                                                            description: []
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <div className="space-y-2">                                     
                                                    {experiences.map((experience, index) => (
                                                        <AccordionItem key={index} value={index.toString()} >
                                                            <AccordionTrigger>
                                                                <div className="items-center justify-center">
                                                                    <Button
                                                                        className="mr-1" 
                                                                        variant={'ghost'}
                                                                        onClick={
                                                                        () => {
                                                                            const newExperiences = experiences.slice()
                                                                            newExperiences.splice(index, 1)
                                                                            setExperiences(newExperiences)
                                                                        }
                                                                    }>
                                                                        <MinusCircle size={20} />
                                                                    </Button>
                                                                    {`Company - ${index+1}`}
                                                                </div>
                                                                
                                                            </AccordionTrigger>
                                                            <AccordionContent className="space-y-2">
                                                                <div className="flex flex-col space-y-1">
                                                                    <Label className="ml-1" htmlFor={`experienceTitle-${index}`}>Company Name</Label>
                                                                    <Input className="w-11/12 ml-1" id={`experienceTitle-${index}`} type="text" value={experience.company} onChange={(e) => {
                                                                        const newExperiences = experiences.slice()
                                                                        newExperiences[index].company = e.target.value
                                                                        setExperiences(newExperiences)
                                                                    }} />
                                                                </div>
                                                                <div className="flex flex-col space-y-1">
                                                                    <Label className="ml-1" htmlFor={`experienceContent-${index}`}>Location</Label>
                                                                    <Input className="w-11/12 ml-1" id={`experienceContent-${index}`} type="text" value={experience.location} onChange={(e) => {
                                                                        const newExperiences = experiences.slice()
                                                                        newExperiences[index].location = e.target.value
                                                                        setExperiences(newExperiences)
                                                                    }} />
                                                                </div>
                                                                <div className="flex flex-col space-y-1">
                                                                    <Label className="ml-1" htmlFor={`experienceContent-${index}`}>Position</Label>
                                                                    <Input className="w-11/12 ml-1" id={`experienceContent-${index}`} type="text" value={experience.position} onChange={(e) => {
                                                                        const newExperiences = experiences.slice()
                                                                        newExperiences[index].position = e.target.value
                                                                        setExperiences(newExperiences)
                                                                    }} />
                                                                </div>
                                                                <div className="flex flex-col space-y-1">
                                                                    <Label className="ml-1" htmlFor={`experienceContent-${index}`}>Start Date</Label>
                                                                    <Input className="w-11/12 ml-1" id={`experienceContent-${index}`} type="text" value={experience.startDate} onChange={(e) => {
                                                                        const newExperiences = experiences.slice()
                                                                        newExperiences[index].startDate = e.target.value
                                                                        setExperiences(newExperiences)
                                                                    }} />
                                                                </div>
                                                                <div className="flex flex-col space-y-1">
                                                                    <Label className="ml-1" htmlFor={`experienceContent-${index}`}>End Date</Label>
                                                                    <Input className="w-11/12 ml-1" id={`experienceContent-${index}`} type="text" value={experience.endDate} onChange={(e) => {
                                                                        const newExperiences = experiences.slice()
                                                                        newExperiences[index].endDate = e.target.value
                                                                        setExperiences(newExperiences)
                                                                    }} />
                                                                </div>
                                                                <div className="flex flex-col space-y-1">
                                                                    <Label className="ml-1" htmlFor={`experienceContent-${index}`}>Description</Label>
                                                                    {experience.description.map((description, descriptionIndex) =>  (
                                                                        <div className="flex flex-row ml-1 w-11/12" key={descriptionIndex}>
                                                                            <Button 
                                                                                variant={'ghost'}
                                                                                onClick={
                                                                                    () => {
                                                                                        const newExperiences = experiences.slice()
                                                                                        newExperiences[index].description.splice(descriptionIndex, 1)
                                                                                        setExperiences(newExperiences)
                                                                                    }
                                                                            }>
                                                                                <MinusCircle size={16} />
                                                                            </Button>
                                                                            <Input key={descriptionIndex} id={`experienceContent-${index}`} type="text" value={description} onChange={(e) => {
                                                                                const newExperiences = experiences.slice()
                                                                                newExperiences[index].description[descriptionIndex] = e.target.value
                                                                                setExperiences(newExperiences)
                                                                            }} />
                                                                        </div>
                                                                    ))}
                                                                    <Button
                                                                        className="w-11/12 items-center justify-center" 
                                                                        variant={'ghost'}
                                                                        onClick={
                                                                            () => {
                                                                                const newExperiences = experiences.slice()
                                                                                newExperiences[index].description.push('')
                                                                                setExperiences(newExperiences)
                                                                            }
                                                                    }>
                                                                        <PlusCircle size={16} />
                                                                    </Button>
                                                                </div>                                                    
                                                            </AccordionContent>
                                                                
                                                        </AccordionItem>
                                                    ))}
                                                    </div>
                                                </Accordion>                                              
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="honors">
                            <Card>
                                <CardHeader>Honors</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="honorsEnabled">Enabled</Label>
                                            <Switch checked={honorsEnabled} onCheckedChange={setHonorsEnabled} />
                                        </div>
                                        {honorsEnabled && (
                                            <div className="space-y-1">
                                                <Label htmlFor="honorsLabel">Label</Label>
                                                <Input id="honorsLabel" type="text" value={honorsLabel} onChange={(e) => setHonorsLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setHonorsTypes([...honorsTypes, {
                                                            label: '',
                                                            honors: []
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <div className="space-y-2">
                                                    {honorsTypes.map((honorsType, index) => (
                                                        <div key={index} className="space-y-2 border rounded-lg p-4">
                                                            <div className="items-center flex flex-row">
                                                                <Button
                                                                    variant={'ghost'}
                                                                    onClick={
                                                                        () => {
                                                                            const newHonorsTypes = honorsTypes.slice()
                                                                            newHonorsTypes.splice(index, 1)
                                                                            setHonorsTypes(newHonorsTypes)
                                                                        }
                                                                }>
                                                                    <MinusCircle  />
                                                                </Button>
                                                                {`Type - ${index+1}`}
                                                            </div>
                                                            <Label htmlFor="honorsLabel">Type Name</Label>
                                                            <Input id="honorsTypeLabel" type="text" value={honorsTypes[index].label} onChange={(e) => setHonorsTypes(
                                                                honorsTypes.map((honorsType, i) => {
                                                                    if (i === index) {
                                                                        return {
                                                                            ...honorsType,
                                                                            label: e.target.value
                                                                        }
                                                                    }
                                                                    return honorsType
                                                                })
                                                            )} />
                                                            <Button
                                                                className="w-full items-center justify-center" 
                                                                variant={'ghost'}
                                                                onClick={
                                                                    () => {
                                                                        const newHonorsTypes = honorsTypes.slice()
                                                                        newHonorsTypes[index].honors.push({
                                                                            year: '',
                                                                            position: '',
                                                                            honor: '',
                                                                            location: ''
                                                                        })
                                                                        setHonorsTypes(newHonorsTypes)
                                                                    }
                                                            }>
                                                                <PlusCircle size={20}/>
                                                            </Button> 
                                                            <Accordion type="single" collapsible className="w-full">
                                                                <div className="space-y-2">
                                                                    {honorsTypes[index].honors.map((honor, honorIndex) => (
                                                                        <AccordionItem key={honorIndex} value={honorIndex.toString()}>
                                                                            <AccordionTrigger>
                                                                                <div className="items-center justify-center">
                                                                                    <Button
                                                                                        className="mr-1" 
                                                                                        variant={'ghost'}
                                                                                        onClick={
                                                                                        () => {
                                                                                            const newHonorsTypes = honorsTypes.slice()
                                                                                            newHonorsTypes[index].honors.splice(honorIndex, 1)
                                                                                            setHonorsTypes(newHonorsTypes)
                                                                                        }
                                                                                    }>
                                                                                        <MinusCircle size={20} />
                                                                                    </Button>
                                                                                    {`Honor - ${honorIndex+1}`}
                                                                                </div>
                                                                            </AccordionTrigger>
                                                                            <AccordionContent className="space-y-2">
                                                                                <div className="flex flex-col space-y-1">
                                                                                    <Label className="ml-1" htmlFor={`honorYear-${honorIndex}`}>Year</Label>
                                                                                    <Input className="w-11/12 ml-1" id={`honorYear-${honorIndex}`} type="text" value={honor.year} onChange={(e) => {
                                                                                        const newHonorsTypes = honorsTypes.slice()
                                                                                        newHonorsTypes[index].honors[honorIndex].year = e.target.value
                                                                                        setHonorsTypes(newHonorsTypes)
                                                                                    }} />
                                                                                </div>
                                                                                <div className="flex flex-col space-y-1">
                                                                                    <Label className="ml-1" htmlFor={`honorPosition-${honorIndex}`}>Position</Label>
                                                                                    <Input className="w-11/12 ml-1" id={`honorPosition-${honorIndex}`} type="text" value={honor.position} onChange={(e) => {
                                                                                        const newHonorsTypes = honorsTypes.slice()
                                                                                        newHonorsTypes[index].honors[honorIndex].position = e.target.value
                                                                                        setHonorsTypes(newHonorsTypes)
                                                                                    }} />
                                                                                </div>
                                                                                <div className="flex flex-col space-y-1">
                                                                                    <Label className="ml-1" htmlFor={`honorContent-${honorIndex}`}>Honor</Label>
                                                                                    <Input className="w-11/12 ml-1" id={`honorContent-${honorIndex}`} type="text" value={honor.honor} onChange={(e) => {
                                                                                        const newHonorsTypes = honorsTypes.slice()
                                                                                        newHonorsTypes[index].honors[honorIndex].honor = e.target.value
                                                                                        setHonorsTypes(newHonorsTypes)
                                                                                    }} />
                                                                                </div>
                                                                                <div className="flex flex-col space-y-1">
                                                                                    <Label className="ml-1" htmlFor={`honorLocation-${honorIndex}`}>Location</Label>
                                                                                    <Input className="w-11/12 ml-1" id={`honorLocation-${honorIndex}`} type="text" value={honor.location} onChange={(e) => {
                                                                                        const newHonorsTypes = honorsTypes.slice()
                                                                                        newHonorsTypes[index].honors[honorIndex].location = e.target.value
                                                                                        setHonorsTypes(newHonorsTypes)
                                                                                    }} />
                                                                                </div>
                                                                            </AccordionContent>
                                                                        </AccordionItem>
                                                                    ))}
                                                                </div>
                                                            </Accordion>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="presentation">
                            <Card>
                                <CardHeader>Presentations</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="presentationsEnabled">Enabled</Label>
                                            <Switch checked={presentationsEnabled} onCheckedChange={setPresentationsEnabled} />
                                        </div>
                                        {presentationsEnabled && (
                                            <div className="space-y-2">
                                                <Label htmlFor="presentationLabel">Label</Label>
                                                <Input id="presentationLabel" type="text" value={presentationsLabel} onChange={(e) => setPresentationsLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setPresentations([...presentations, {
                                                            event: '',
                                                            role: '',
                                                            location: '',
                                                            date: '',
                                                            description: []
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <div className="space-y-2">
                                                        {presentations.map((presentation, index) => (
                                                            <AccordionItem key={index} value={index.toString()} >
                                                                <AccordionTrigger>
                                                                    <div className="items-center justify-center">
                                                                        <Button
                                                                            className="mr-1" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                            () => {
                                                                                const newPresentations = presentations.slice()
                                                                                newPresentations.splice(index, 1)
                                                                                setPresentations(newPresentations)
                                                                            }
                                                                        }>
                                                                            <MinusCircle size={20} />
                                                                        </Button>
                                                                        {`Presentation - ${index+1}`}
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="space-y-2">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`presentationTitle-${index}`}>Event</Label>
                                                                        <Input className="w-11/12 ml-1" id={`presentationTitle-${index}`} type="text" value={presentation.event} onChange={(e) => {
                                                                            const newPresentations = presentations.slice()
                                                                            newPresentations[index].event = e.target.value
                                                                            setPresentations(newPresentations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`presentationContent-${index}`}>Role</Label>
                                                                        <Input className="w-11/12 ml-1" id={`presentationContent-${index}`} type="text" value={presentation.role} onChange={(e) => {
                                                                            const newPresentations = presentations.slice()
                                                                            newPresentations[index].role = e.target.value
                                                                            setPresentations(newPresentations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`presentationContent-${index}`}>Location</Label>
                                                                        <Input className="w-11/12 ml-1" id={`presentationContent-${index}`} type="text" value={presentation.location} onChange={(e) => {
                                                                            const newPresentations = presentations.slice()
                                                                            newPresentations[index].location = e.target.value
                                                                            setPresentations(newPresentations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`presentationContent-${index}`}>Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`presentationContent-${index}`} type="text" value={presentation.date} onChange={(e) => {
                                                                            const newPresentations = presentations.slice()
                                                                            newPresentations[index].date = e.target.value
                                                                            setPresentations(newPresentations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`presentationContent-${index}`}>Description</Label>
                                                                        {presentation.description.map((description, descriptionIndex) =>  (
                                                                            <div className="flex flex-row ml-1 w-11/12" key={descriptionIndex}>
                                                                                <Button 
                                                                                    variant={'ghost'}
                                                                                    onClick={
                                                                                        () => {
                                                                                            const newPresentations = presentations.slice()
                                                                                            newPresentations[index].description.splice(descriptionIndex, 1)
                                                                                            setPresentations(newPresentations)
                                                                                        }
                                                                                }>
                                                                                    <MinusCircle size={16} />
                                                                                </Button>
                                                                                <Input key={descriptionIndex} id={`presentationContent-${index}`} type="text" value={description} onChange={(e) => {
                                                                                    const newPresentations = presentations.slice()
                                                                                    newPresentations[index].description[descriptionIndex] = e.target.value
                                                                                    setPresentations(newPresentations)
                                                                                }} />
                                                                            </div>
                                                                        ))}
                                                                        <Button
                                                                            className="w-11/12 items-center justify-center" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                                () => {
                                                                                    const newPresentations = presentations.slice()
                                                                                    newPresentations[index].description.push('')
                                                                                    setPresentations(newPresentations)
                                                                                }
                                                                        }>
                                                                            <PlusCircle size={16} />
                                                                        </Button>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </div> 
                                                </Accordion>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="writing">
                            <Card>
                                <CardHeader>Writings</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="writingEnabled">Enabled</Label>
                                            <Switch checked={writingEnabled} onCheckedChange={setWritingEnabled} />
                                        </div>  
                                        {writingEnabled && (
                                            <div className="space-y-1">
                                                <Label htmlFor="writingLabel">Label</Label>
                                                <Input id="writingLabel" type="text" value={writingLabel} onChange={(e) => setWritingLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setWritings([...writings, {
                                                            title: '',
                                                            role: '',
                                                            medium: '',
                                                            startDate: '',
                                                            endDate: '',
                                                            descriptions: []
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <div className="space-y-2">
                                                        {writings.map((writing, index) => (
                                                            <AccordionItem key={index} value={index.toString()} >
                                                                <AccordionTrigger>
                                                                    <div className="items-center justify-center">
                                                                        <Button
                                                                            className="mr-1" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                            () => {
                                                                                const newWritings = writings.slice()
                                                                                newWritings.splice(index, 1)
                                                                                setWritings(newWritings)
                                                                            }
                                                                        }>
                                                                            <MinusCircle size={20} />
                                                                        </Button>
                                                                        {`Writing - ${index+1}`}
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="space-y-2">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`writingTitle-${index}`}>Title</Label>
                                                                        <Input className="w-11/12 ml-1" id={`writingTitle-${index}`} type="text" value={writing.title} onChange={(e) => {
                                                                            const newWritings = writings.slice()
                                                                            newWritings[index].title = e.target.value
                                                                            setWritings(newWritings)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`writingContent-${index}`}>Role</Label>
                                                                        <Input className="w-11/12 ml-1" id={`writingContent-${index}`} type="text" value={writing.role} onChange={(e) => {
                                                                            const newWritings = writings.slice()
                                                                            newWritings[index].role = e.target.value
                                                                            setWritings(newWritings)
                                                                        }} />
                                                                    </div>                                                                
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`writingContent-${index}`}>Medium</Label>
                                                                        <Input className="w-11/12 ml-1" id={`writingContent-${index}`} type="text" value={writing.medium} onChange={(e) => {
                                                                            const newWritings = writings.slice()
                                                                            newWritings[index].medium = e.target.value
                                                                            setWritings(newWritings)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`writingContent-${index}`}>Start Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`writingContent-${index}`} type="text" value={writing.startDate} onChange={(e) => {
                                                                            const newWritings = writings.slice()
                                                                            newWritings[index].startDate = e.target.value
                                                                            setWritings(newWritings)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`writingContent-${index}`}>End Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`writingContent-${index}`} type="text" value={writing.endDate} onChange={(e) => {
                                                                            const newWritings = writings.slice()
                                                                            newWritings[index].endDate = e.target.value
                                                                            setWritings(newWritings)
                                                                        }} />
                                                                    </div> 
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`writingContent-${index}`}>Description</Label>
                                                                        {writing.descriptions.map((description, descriptionIndex) =>  (
                                                                            <div className="flex flex-row ml-1 w-11/12" key={descriptionIndex}>
                                                                                <Button 
                                                                                    variant={'ghost'}
                                                                                    onClick={
                                                                                        () => {
                                                                                            const newWritings = writings.slice()
                                                                                            newWritings[index].descriptions.splice(descriptionIndex, 1)
                                                                                            setWritings(newWritings)
                                                                                        }
                                                                                }>
                                                                                    <MinusCircle size={16} />
                                                                                </Button>
                                                                                <Input key={descriptionIndex} id={`writingContent-${index}`} type="text" value={description} onChange={(e) => {
                                                                                    const newWritings = writings.slice()
                                                                                    newWritings[index].descriptions[descriptionIndex] = e.target.value
                                                                                    setWritings(newWritings)
                                                                                }} />
                                                                            </div>
                                                                        ))}
                                                                        <Button
                                                                            className="w-11/12 items-center justify-center" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                                () => {
                                                                                    const newWritings = writings.slice()
                                                                                    newWritings[index].descriptions.push('')
                                                                                    setWritings(newWritings)
                                                                                }
                                                                        }>
                                                                            <PlusCircle size={16} />
                                                                        </Button>
                                                                    </div> 
                                                                </AccordionContent>    
                                                            </AccordionItem>
                                                        ))}
                                                        </div>
                                                    </Accordion>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="committee">
                            <Card>
                                <CardHeader>Committee</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="committeeEnabled">Enabled</Label>
                                            <Switch checked={committeeEnabled} onCheckedChange={setCommitteeEnabled} />
                                        </div>
                                        {committeeEnabled && (
                                            <div className="space-y-1">
                                                <Label htmlFor="committeeLabel">Label</Label>
                                                <Input id="committeeLabel" type="text" value={committeeLabel} onChange={(e) => setCommitteeLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setCommittees([...committees, {
                                                            year: '',
                                                            position: '',
                                                            organization: '',
                                                            location: '',
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <div className="space-y-2">
                                                        {committees.map((committee, index) => (
                                                            <AccordionItem key={index} value={index.toString()}>
                                                                <AccordionTrigger>
                                                                    <div className="items-center justify-center">
                                                                        <Button
                                                                            className="mr-1" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                            () => {
                                                                                const newCommittees = committees.slice()
                                                                                newCommittees.splice(index, 1)
                                                                                setCommittees(newCommittees)
                                                                            }
                                                                        }>
                                                                            <MinusCircle size={20} />
                                                                        </Button>
                                                                        {`Committee - ${index+1}`}
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="space-y-2">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`committeeYear-${index}`}>Year</Label>
                                                                        <Input className="w-11/12 ml-1" id={`committeeYear-${index}`} type="text" value={committee.year} onChange={(e) => {
                                                                            const newCommittees = committees.slice()
                                                                            newCommittees[index].year = e.target.value
                                                                            setCommittees(newCommittees)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`committeePosition-${index}`}>Position</Label>
                                                                        <Input className="w-11/12 ml-1" id={`committeePosition-${index}`} type="text" value={committee.position} onChange={(e) => {
                                                                            const newCommittees = committees.slice()
                                                                            newCommittees[index].position = e.target.value
                                                                            setCommittees(newCommittees)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`committeeOrganization-${index}`}>Organization</Label>
                                                                        <Input className="w-11/12 ml-1" id={`committeeOrganization-${index}`} type="text" value={committee.organization} onChange={(e) => {
                                                                            const newCommittees = committees.slice()
                                                                            newCommittees[index].organization = e.target.value
                                                                            setCommittees(newCommittees)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`committeeLocation-${index}`}>Location</Label>
                                                                        <Input className="w-11/12 ml-1" id={`committeeLocation-${index}`} type="text" value={committee.location} onChange={(e) => {
                                                                                const newCommittees = committees.slice()
                                                                                newCommittees[index].location = e.target.value
                                                                                setCommittees(newCommittees)
                                                                            }
                                                                        } />
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </div>
                                                </Accordion>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="education">
                            <Card>
                                <CardHeader>Education</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="educationEnabled">Enabled</Label>
                                            <Switch checked={educationEnabled} onCheckedChange={setEducationEnabled} />
                                        </div>                                        
                                        {educationEnabled && (
                                            <div className="space-y-1">
                                                <Label htmlFor="educationLabel">Label</Label>
                                                <Input id="educationLabel" type="text" value={educationLabel} onChange={(e) => setEducationLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setEducations([...educations, {
                                                            degree: '',
                                                            school: '',
                                                            startDate: '',
                                                            endDate: '',
                                                            location: '',
                                                            description: []
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <div className="space-y-2">
                                                        {educations.map((education, index) => (
                                                            <AccordionItem key={index} value={index.toString()}>
                                                                <AccordionTrigger>
                                                                    <div className="items-center justify-center">
                                                                        <Button
                                                                            className="mr-1" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                            () => {
                                                                                const newEducations = educations.slice()
                                                                                newEducations.splice(index, 1)
                                                                                setEducations(newEducations)
                                                                            }
                                                                        }>
                                                                            <MinusCircle size={20} />
                                                                        </Button>
                                                                        {`Education - ${index+1}`}
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="space-y-2">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`educationDegree-${index}`}>Degree</Label>
                                                                        <Input className="w-11/12 ml-1" id={`educationDegree-${index}`} type="text" value={education.degree} onChange={(e) => {
                                                                            const newEducations = educations.slice()
                                                                            newEducations[index].degree = e.target.value
                                                                            setEducations(newEducations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`educationSchool-${index}`}>School</Label>
                                                                        <Input className="w-11/12 ml-1" id={`educationSchool-${index}`} type="text" value={education.school} onChange={(e) => {
                                                                            const newEducations = educations.slice()
                                                                            newEducations[index].school = e.target.value
                                                                            setEducations(newEducations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`educationStartDate-${index}`}>Start Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`educationStartDate-${index}`} type="text" value={education.startDate} onChange={(e) => {
                                                                            const newEducations = educations.slice()
                                                                            newEducations[index].startDate = e.target.value
                                                                            setEducations(newEducations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`educationEndDate-${index}`}>End Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`educationEndDate-${index}`} type="text" value={education.endDate} onChange={(e) => {
                                                                            const newEducations = educations.slice()
                                                                            newEducations[index].endDate = e.target.value
                                                                            setEducations(newEducations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`educationLocation-${index}`}>Location</Label>
                                                                        <Input className="w-11/12 ml-1" id={`educationLocation-${index}`} type="text" value={education.location} onChange={(e) => {
                                                                            const newEducations = educations.slice()
                                                                            newEducations[index].location = e.target.value
                                                                            setEducations(newEducations)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`educationContent-${index}`}>Description</Label>
                                                                        {education.description.map((description, descriptionIndex) =>  (
                                                                            <div className="flex flex-row ml-1 w-11/12" key={descriptionIndex}>
                                                                                <Button 
                                                                                    variant={'ghost'}
                                                                                    onClick={
                                                                                        () => {
                                                                                            const newEducations = educations.slice()
                                                                                            newEducations[index].description.splice(descriptionIndex, 1)
                                                                                            setEducations(newEducations)
                                                                                        }
                                                                                }>
                                                                                    <MinusCircle size={16} />
                                                                                </Button>
                                                                                <Input key={descriptionIndex} id={`educationContent-${index}`} type="text" value={description} onChange={(e) => {
                                                                                    const newEducations = educations.slice()
                                                                                    newEducations[index].description[descriptionIndex] = e.target.value
                                                                                    setEducations(newEducations)
                                                                                }} />
                                                                            </div>
                                                                        ))}
                                                                        <Button
                                                                            className="w-11/12 items-center justify-center" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                                () => {
                                                                                    const newEducations = educations.slice()
                                                                                    newEducations[index].description.push('')
                                                                                    setEducations(newEducations)
                                                                                }
                                                                        }>
                                                                            <PlusCircle size={16} />
                                                                        </Button>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </div>
                                                </Accordion>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="extracurricular">
                            <Card>
                                <CardHeader>Extracurricular</CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="extracurricularEnabled">Enabled</Label>
                                            <Switch checked={extracurricularEnabled} onCheckedChange={setExtracurricularEnabled} />
                                        </div>
                                        {extracurricularEnabled && (
                                            <div className="space-y-1">
                                                <Label htmlFor="extracurricularLabel">Label</Label>
                                                <Input id="extracurricularLabel" type="text" value={extracurricularLabel} onChange={(e) => setExtracurricularLabel(e.target.value)} />
                                                <Button
                                                    className="w-full items-center justify-center" 
                                                    variant={'ghost'}
                                                    onClick={
                                                        () => setExtracurriculars([...extracurriculars, {
                                                            role: '',
                                                            organization: '',
                                                            startDate: '',
                                                            endDate: '',
                                                            location: '',
                                                            description: []
                                                        }])
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <div className="space-y-2">
                                                        {extracurriculars.map((extracurricular, index) => (
                                                            <AccordionItem key={index} value={index.toString()}>
                                                                <AccordionTrigger>
                                                                    <div className="items-center justify-center">
                                                                        <Button
                                                                            className="mr-1" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                            () => {
                                                                                const newExtracurriculars = extracurriculars.slice()
                                                                                newExtracurriculars.splice(index, 1)
                                                                                setExtracurriculars(newExtracurriculars)
                                                                            }
                                                                        }>
                                                                            <MinusCircle size={20} />
                                                                        </Button>
                                                                        {`Extracurricular - ${index+1}`}
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="space-y-2">
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`extracurricularRole-${index}`}>Role</Label>
                                                                        <Input className="w-11/12 ml-1" id={`extracurricularRole-${index}`} type="text" value={extracurricular.role} onChange={(e) => {
                                                                            const newExtracurriculars = extracurriculars.slice()
                                                                            newExtracurriculars[index].role = e.target.value
                                                                            setExtracurriculars(newExtracurriculars)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`extracurricularOrganization-${index}`}>Organization</Label>
                                                                        <Input className="w-11/12 ml-1" id={`extracurricularOrganization-${index}`} type="text" value={extracurricular.organization} onChange={(e) => {
                                                                            const newExtracurriculars = extracurriculars.slice()
                                                                            newExtracurriculars[index].organization = e.target.value
                                                                            setExtracurriculars(newExtracurriculars)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`extracurricularStartDate-${index}`}>Start Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`extracurricularStartDate-${index}`} type="text" value={extracurricular.startDate} onChange={(e) => {
                                                                            const newExtracurriculars = extracurriculars.slice()
                                                                            newExtracurriculars[index].startDate = e.target.value
                                                                            setExtracurriculars(newExtracurriculars)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`extracurricularEndDate-${index}`}>End Date</Label>
                                                                        <Input className="w-11/12 ml-1" id={`extracurricularEndDate-${index}`} type="text" value={extracurricular.endDate} onChange={(e) => {
                                                                            const newExtracurriculars = extracurriculars.slice()
                                                                            newExtracurriculars[index].endDate = e.target.value
                                                                            setExtracurriculars(newExtracurriculars)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`extracurricularLocation-${index}`}>Location</Label>
                                                                        <Input className="w-11/12 ml-1" id={`extracurricularLocation-${index}`} type="text" value={extracurricular.location} onChange={(e) => {
                                                                            const newExtracurriculars = extracurriculars.slice()
                                                                            newExtracurriculars[index].location = e.target.value
                                                                            setExtracurriculars(newExtracurriculars)
                                                                        }} />
                                                                    </div>
                                                                    <div className="flex flex-col space-y-1">
                                                                        <Label className="ml-1" htmlFor={`extracurricularContent-${index}`}>Description</Label>
                                                                        {extracurricular.description.map((description, descriptionIndex) =>  (
                                                                            <div className="flex flex-row ml-1 w-11/12" key={descriptionIndex}>
                                                                                <Button 
                                                                                    variant={'ghost'}
                                                                                    onClick={
                                                                                        () => {
                                                                                            const newExtracurriculars = extracurriculars.slice()
                                                                                            newExtracurriculars[index].description.splice(descriptionIndex, 1)
                                                                                            setExtracurriculars(newExtracurriculars)
                                                                                        }
                                                                                }>
                                                                                    <MinusCircle size={16} />
                                                                                </Button>
                                                                                <Input key={descriptionIndex} id={`extracurricularContent-${index}`} type="text" value={description} onChange={(e) => {
                                                                                    const newExtracurriculars = extracurriculars.slice()
                                                                                    newExtracurriculars[index].description[descriptionIndex] = e.target.value
                                                                                    setExtracurriculars(newExtracurriculars)
                                                                                }} />
                                                                            </div>
                                                                        ))}
                                                                        <Button
                                                                            className="w-11/12 items-center justify-center" 
                                                                            variant={'ghost'}
                                                                            onClick={
                                                                                () => {
                                                                                    const newExtracurriculars = extracurriculars.slice()
                                                                                    newExtracurriculars[index].description.push('')
                                                                                    setExtracurriculars(newExtracurriculars)
                                                                                }
                                                                        }>
                                                                            <PlusCircle size={16} />
                                                                        </Button>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </div>
                                                </Accordion>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
                className="min-w-[190mm]"
                defaultSize={50}
            >
                <Button onClick={downloadCV} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {loading ? 'Generating PDF...' : 'Download'}
                </Button>
                <DisplayFrame>
                    <CV {...cvProps} />
                </DisplayFrame>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}