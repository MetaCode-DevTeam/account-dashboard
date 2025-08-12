import { Footer } from './footer/Footer'
import { Head } from './Head'
import Body from './body/Body'
import { LandingHeader } from '../../components/layer/header/LandingHeader'

export default function Landing() {
    return (
        <div className="box-border overflow-hidden pt-0">
            <LandingHeader />
            <Head />
            <Body />
            <Footer />
        </div>
    )
}
