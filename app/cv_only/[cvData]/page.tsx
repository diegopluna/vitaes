import A4Paper from "@/components/a4-paper";
import CV from "@/components/cv/cv";
import { CVProps } from "@/types/cv-types";
import { decode } from 'urlencode';


export default function Page({params} : {params: {cvData: string } }) {
    const cvData = JSON.parse(decode(params.cvData)) as CVProps

    return (
        <CV {...cvData} />
    )
}