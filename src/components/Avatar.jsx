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

  useEffect(() => {
    // Stop all other actions
    Object.values(actions).forEach(action => action.stop())
    
    const action = actions[animationName]
    if (action) {
      action.reset().fadeIn(0.5).play()
      return () => action.fadeOut(0.5)
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
