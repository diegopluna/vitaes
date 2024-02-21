"use client"

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CV from "./cv";
import { CVExperienceProps, CVHeaderProps, CVProps } from "@/types/cv-types";
import { Textarea } from "@/components/ui/textarea";

export default function CVForm() {
    const [alignment, setAlignment] = React.useState('center')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phoneEnabled, setPhoneEnabled] = React.useState(false)
    const [phone, setPhone] = React.useState('')
    const [emailEnabled, setEmailEnabled] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [homepageEnabled, setHomepageEnabled] = React.useState(false)
    const [homepage, setHomepage] = React.useState('')
    const [githubEnabled, setGithubEnabled] = React.useState(false)
    const [github, setGithub] = React.useState('')
    const [linkedinEnabled, setLinkedinEnabled] = React.useState(false)
    const [linkedin, setLinkedin] = React.useState('')
    const [gitlabEnabled, setGitlabEnabled] = React.useState(false)
    const [gitlab, setGitlab] = React.useState('')
    const [twitterEnabled, setTwitterEnabled] = React.useState(false)
    const [twitter, setTwitter] = React.useState('')
    const [quoteEnabled, setQuoteEnabled] = React.useState(false)
    const [quote, setQuote] = React.useState('')
    const [ summaryEnabled, setSummaryEnabled ] = React.useState(false)
    const [ summaryLabel, setSummaryLabel ] = React.useState('Summary')
    const [ summaryContent, setSummaryContent ] = React.useState('')
    const [ experienceEnabled, setExperienceEnabled ] = React.useState(false)
    const [ experienceLabel, setExperienceLabel ] = React.useState('Experience')
    const [ experiences, setExperiences ] = React.useState([] as CVExperienceProps[])

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
        }
    }

    // React.useEffect(() => {
    //     console.log(alignment)
    // }, [alignment])

    return (
        <div className="flex flex-row w-full">
            <Tabs defaultValue="header" className="w-[600px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="header">Header</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                </TabsList>
                <TabsContent value="header">
                    <Card>
                        <CardHeader>Header</CardHeader>
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
                                <div className="flex flex-row">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Switch checked={phoneEnabled} onCheckedChange={setPhoneEnabled} />
                                </div>
                                {phoneEnabled && (
                                    <Input placeholder="Phone" id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
                                    <Label htmlFor="email">Email</Label>
                                    <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                                </div>
                                {emailEnabled && (
                                    <Input placeholder="Email" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
                                    <Label htmlFor="homepage">Homepage</Label>
                                    <Switch checked={homepageEnabled} onCheckedChange={setHomepageEnabled} />
                                </div>
                                {homepageEnabled && (
                                    <Input placeholder="Homepage" id="homepage" type="text" value={homepage} onChange={(e) => setHomepage(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
                                    <Label htmlFor="github">Github</Label>
                                    <Switch checked={githubEnabled} onCheckedChange={setGithubEnabled} />
                                </div>
                                {githubEnabled && (
                                    <Input placeholder="Github" id="github" type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
                                    <Label htmlFor="linkedin">Linkedin</Label>
                                    <Switch checked={linkedinEnabled} onCheckedChange={setLinkedinEnabled} />
                                </div>
                                {linkedinEnabled && (
                                    <Input placeholder="Linkedin" id="linkedin" type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
                                    <Label htmlFor="gitlab">Gitlab</Label>
                                    <Switch checked={gitlabEnabled} onCheckedChange={setGitlabEnabled} />
                                </div>
                                {gitlabEnabled && (
                                    <Input placeholder="Gitlab" id="gitlab" type="text" value={gitlab} onChange={(e) => setGitlab(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
                                    <Label htmlFor="twitter">Twitter</Label>
                                    <Switch checked={twitterEnabled} onCheckedChange={setTwitterEnabled} />
                                </div>
                                {twitterEnabled && (
                                    <Input placeholder="Twitter" id="twitter" type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                                )}
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-row">
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
                        <CardHeader>Summary</CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <div className="flex flex-row">
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
                                <div className="flex flex-row">
                                    <Label htmlFor="experienceEnabled">Enabled</Label>
                                    <Switch checked={experienceEnabled} onCheckedChange={setExperienceEnabled} />
                                </div>
                                {experienceEnabled && (
                                    <div className="space-y-1">
                                        <Label htmlFor="experienceLabel">Label</Label>
                                        <Input id="experienceLabel" type="text" value={experienceLabel} onChange={(e) => setExperienceLabel(e.target.value)} />
                                        {experiences.map((experience, index) => (
                                            <div key={index} className="space-y-1">
                                                <Button onClick={
                                                    () => {
                                                        const newExperiences = experiences.slice()
                                                        newExperiences.splice(index, 1)
                                                        setExperiences(newExperiences)
                                                    }
                                                }>
                                                    <MinusCircle />
                                                </Button>
                                                <Label htmlFor={`experienceTitle-${index}`}>Company</Label>
                                                <Input id={`experienceTitle-${index}`} type="text" value={experience.company} onChange={(e) => {
                                                    const newExperiences = experiences.slice()
                                                    newExperiences[index].company = e.target.value
                                                    setExperiences(newExperiences)
                                                }} />
                                                <Label htmlFor={`experienceContent-${index}`}>Location</Label>
                                                <Input id={`experienceContent-${index}`} type="text" value={experience.location} onChange={(e) => {
                                                    const newExperiences = experiences.slice()
                                                    newExperiences[index].location = e.target.value
                                                    setExperiences(newExperiences)
                                                }} />
                                                <Label htmlFor={`experienceContent-${index}`}>Position</Label>
                                                <Input id={`experienceContent-${index}`} type="text" value={experience.position} onChange={(e) => {
                                                    const newExperiences = experiences.slice()
                                                    newExperiences[index].position = e.target.value
                                                    setExperiences(newExperiences)
                                                }} />
                                                <Label htmlFor={`experienceContent-${index}`}>Start Date</Label>
                                                <Input id={`experienceContent-${index}`} type="text" value={experience.startDate} onChange={(e) => {
                                                    const newExperiences = experiences.slice()
                                                    newExperiences[index].startDate = e.target.value
                                                    setExperiences(newExperiences)
                                                }} />
                                                <Label htmlFor={`experienceContent-${index}`}>End Date</Label>
                                                <Input id={`experienceContent-${index}`} type="text" value={experience.endDate} onChange={(e) => {
                                                    const newExperiences = experiences.slice()
                                                    newExperiences[index].endDate = e.target.value
                                                    setExperiences(newExperiences)
                                                }} />
                                                <Label htmlFor={`experienceContent-${index}`}>Description</Label>
                                                {experience.description.map((description, descriptionIndex) =>  (
                                                    <div key={descriptionIndex}>
                                                        <Button onClick={
                                                            () => {
                                                                const newExperiences = experiences.slice()
                                                                newExperiences[index].description.splice(descriptionIndex, 1)
                                                                setExperiences(newExperiences)
                                                            }
                                                        }>
                                                            <MinusCircle />
                                                        </Button>
                                                        <Input key={descriptionIndex} id={`experienceContent-${index}`} type="text" value={description} onChange={(e) => {
                                                            const newExperiences = experiences.slice()
                                                            newExperiences[index].description[descriptionIndex] = e.target.value
                                                            setExperiences(newExperiences)
                                                        }} />
                                                    </div>
                                                ))}
                                                <Button onClick={
                                                    () => {
                                                        const newExperiences = experiences.slice()
                                                        newExperiences[index].description.push('')
                                                        setExperiences(newExperiences)
                                                    }
                                                }>
                                                    <PlusCircle />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button onClick={
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
                                        {/* <Label htmlFor="experienceContent">Content</Label>
                                        <Input id="experienceContent" type="text" value={experienceContent} onChange={(e) => setExperienceContent(e.target.value)} /> */}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <CV {...cvProps} />
            <Button onClick={async () => {
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
            }
            }>Download</Button>
        </div>
        
    )
}