export function SectionDivider() {
  return (
    <div className="w-full py-6 flex justify-center overflow-hidden">
      <div className="relative w-full max-w-md h-px">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
          style={{
            animation: 'shimmer-line 3s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  )
}
