import React, { useEffect, useRef, useMemo } from 'react'
import { useFBX, useAnimations } from '@react-three/drei'

export function Avatar({ animationName = "T-Pose", scale = 0.01, ...props }) {
  const group = useRef()
  const tPose = useFBX('/models/T-Pose.fbx')
  const chickenDance = useFBX('/models/Chicken Dance.fbx')
  const snakeDance = useFBX('/models/Snake Hip Hop Dance (1).fbx')
  const twistDance = useFBX('/models/Twist Dance.fbx')

  const animations = useMemo(() => {
    const clips = []
    
    // Helper to process clip
    const addClip = (fbx, newName) => {
      if (fbx.animations.length) {
        const clip = fbx.animations[0].clone()
        clip.name = newName
        clips.push(clip)
      }
    }

    addClip(tPose, "T-Pose")
    addClip(chickenDance, "Chicken")
    addClip(snakeDance, "Snake")
    addClip(twistDance, "Twist")

    return clips
  }, [tPose, chickenDance, snakeDance, twistDance])

  const { actions } = useAnimations(animations, group)

  // Audio handling
  const audioRef = useRef(null)
  if (!audioRef.current) {
    audioRef.current = new Audio()
  }

  useEffect(() => {
    // Map animations to audio files
    const audioMap = {
      'Chicken': '/audio/appadi%20podu.mp3',
      'Snake': '/audio/kannum.mp3',
      'Twist': '/audio/thevuda.mp3',
      'T-Pose': null
    }

    const audioFile = audioMap[animationName]
    const audio = audioRef.current

    // Stop current audio
    audio.pause()
    audio.currentTime = 0

    // Play new audio if exists
    if (audioFile) {
      audio.src = audioFile
      audio.loop = true
      audio.volume = 0.5
      audio.play().catch(e => console.log("Audio play failed (interaction needed):", e))
    }

    // Stop all other actions
    Object.values(actions).forEach(action => action.stop())
    
    const action = actions[animationName]
    if (action) {
      action.reset().fadeIn(0.5).play()
      return () => {
        action.fadeOut(0.5)
        audio.pause() // Ensure audio stops on cleanup/change
      }
    }
  }, [animationName, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={tPose} scale={scale} />
    </group>
  )
}

useFBX.preload('/models/T-Pose.fbx')
useFBX.preload('/models/Chicken Dance.fbx')
useFBX.preload('/models/Snake Hip Hop Dance (1).fbx')
useFBX.preload('/models/Twist Dance.fbx')
