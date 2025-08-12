import SvgN1 from './svgs/SvgN1'
import { SvgN2 } from './svgs/SvgN2'
import { SvgN3 } from './svgs/SvgN3'
import { LineHead } from './LineHead'

export default function Trust() {
    return (
        <div className="pt-12 flex justify-center items-center gap-8 flex-col">
            <LineHead
                h2Par="مورد اعتماد 2000 شرکت "
                pPar="نظرات شرکت‌هایی که ما را انتخاب کرده‌اند"
            />

            <div className="flex flex-wrap justify-center items-center">
                <SvgN1 />
                <SvgN2 />
                <SvgN3 />
            </div>
        </div>
    )
}
