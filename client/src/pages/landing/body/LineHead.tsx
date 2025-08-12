export const LineHead = ({ h2Par, pPar }: { h2Par: string; pPar: string }) => {
    return (
        <div className="flex justify-center items-center gap-2 flex-col">
            <h2 className="text-landing">{h2Par}</h2>
            <p className="text-base text-neutral-500 text-center">{pPar}</p>
        </div>
    )
}
