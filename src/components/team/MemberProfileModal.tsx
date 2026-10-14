"use client";

import React from "react";
import { TeamMember } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Mail, Trophy, CheckCircle2, Wand2, ArrowLeft, Shield, Sparkles, BookOpen, UserCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface MemberProfileModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberProfileModal({
  member,
  isOpen,
  onClose,
}: MemberProfileModalProps) {
  if (!member) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={member.name}
      subtitle={member.role}
      maxWidth="3xl"
    >
      <div className="space-y-6 text-slate-200">
        {/* ================= TOP BACK BUTTON & QUICK BAR ================= */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 hover:text-white text-xs font-mono transition-all duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F6E27A] group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Squad</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400">
            Dossier • Verified Outliers Candidate
          </span>
        </div>

        {/* ================= 1. PERSON INFO HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 rounded-2xl bg-[#090d1a] border border-amber-400/30 shadow-[0_0_25px_rgba(246,226,122,0.12)]">
          {/* Avatar Graphic */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1f1807] via-[#101524] to-[#080c16] border-2 border-amber-400/60 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(246,226,122,0.25)]">
            {member.avatarUrl ? (
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-extrabold text-[#F6E27A]">
                {member.name.charAt(0)}
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 py-0.5 text-center text-[8px] font-mono font-bold bg-[#F6E27A] text-[#07090E] shadow-sm">
              OUTLIERS
            </div>
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-mono font-semibold text-amber-300">
                {member.role}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#FFFDF5] italic leading-snug">
              “{member.tagline}”
            </p>

            {/* Social Links */}
            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {member.links.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#F6E27A]" />
                  <span>GitHub</span>
                </a>
              )}
              {member.links.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#F6E27A]" />
                  <span>LinkedIn</span>
                </a>
              )}
              <a
                href={`mailto:${member.links.email}`}
                className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-400/20 border border-amber-400/30 text-xs text-amber-300 transition-colors flex items-center gap-1.5 font-mono"
              >
                <Mail className="w-3 h-3 text-[#F6E27A]" />
                <span>{member.links.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= 2. ROLE & IMPACT IN THIS TEAM ================= */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0e1424] to-[#090d1a] border border-amber-400/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-[#F6E27A]" />
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] font-bold">
              Role & Responsibility in Outliers
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            {member.teamRoleAndImpact}
          </p>
        </div>

        {/* ================= 3. DETAILED ENGINEERING BACKGROUND & STORY ================= */}
        <div className="p-5 rounded-2xl bg-[#090d1a]/90 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <h4 className="text-xs uppercase font-mono tracking-wider text-amber-300 font-bold">
              Detailed Background & Experience
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {member.detailedDescription}
          </p>
        </div>

        {/* ================= 4. FLAGSHIP PROJECT ================= */}
        <div className="p-4 rounded-xl bg-[#0b1020] border border-amber-400/25">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#F6E27A] font-bold">
                Signature Project: {member.strongestProject.title}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {member.strongestProject.role}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mt-1">
            {member.strongestProject.description}
          </p>
        </div>

        {/* ================= 5. VERIFIED ACHIEVEMENTS ================= */}
        <div className="p-4 rounded-xl bg-[#090d1a]/80 border border-amber-400/20">
          <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-2.5">
            <Trophy className="w-4 h-4 text-[#F6E27A]" />
            <span>Key Accomplishments & Credentials</span>
          </h4>
          <ul className="space-y-2">
            {member.individualAchievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#F6E27A] shrink-0 mt-0.5" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= 6. TECHNICAL TOOLBELT ================= */}
        <div className="p-4 rounded-xl bg-[#090d1a]/80 border border-white/10">
          <div className="flex items-center gap-1.5 mb-2.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-300" />
            <h4 className="text-xs uppercase font-mono tracking-wider text-amber-300 font-semibold">
              Technical Stack & Tools
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.skills.core.map((skill) => (
              <Badge key={skill} variant="gold" size="sm">
                {skill}
              </Badge>
            ))}
            {member.skills.secondary.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-md border border-white/10 bg-white/5 text-[11px] font-mono text-slate-300"
              >
                {skill}
              </span>
            ))}
            {member.skills.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-0.5 rounded-md border border-amber-400/20 bg-amber-950/30 text-[10px] font-mono text-amber-200/80"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM BACK BUTTON ================= */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_20px_rgba(246,226,122,0.4)] text-[#07090E] font-bold text-xs tracking-wide transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#07090E]" />
            <span>← Back to Squad</span>
          </button>

          <a
            href={`mailto:${member.links.email}`}
            className="text-xs font-mono text-amber-300 hover:text-white transition-colors"
          >
            Contact {member.name.split(" ")[0]} Directly ↗
          </a>
        </div>
      </div>
    </Modal>
  );
}
