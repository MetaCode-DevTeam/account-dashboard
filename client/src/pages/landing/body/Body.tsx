import { Comments } from './comments/Comments'
import { Companies } from './Companies'
import { Evolve } from './Evolve'
import { Features } from './Features'
import { Subscribe } from './Subscribe'
import Trust from './Trust'

export default function Body() {
    return (
        <>
            <div className="p-6 flex flex-col justify-center items-center gap-[88px]">
                <Trust />
                <Companies />
                <Features />
                <Evolve />
                <Comments />
            </div>
            <Subscribe />
        </>
    )
}
