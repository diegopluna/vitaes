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
import { Briefcase, GraduationCap, Languages, Loader2, Medal, NotebookPen, Pen, PencilRuler, Presentation, ScrollText, UserRound, UsersRound, PlusCircle, MinusCircle } from "lucide-react";
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
                className="min-w-[600px]"
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